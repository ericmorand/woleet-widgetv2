import {getFileHasherObserverMappers} from 'FileHasherWidget/defaults';
import ConfigurationService from 'Common/services/configurator';
import VirtualDOMService from 'Common/services/virtual-dom';
import EventObserver from 'Common/patterns/event-observer';
import utils from 'Common/services/utils';
import styleCodes from './style-codes';
import styles from './index.scss';

import DropContainer from 'FileHasherWidget/components/drop-container';
import TitleContainer from 'FileHasherWidget/components/title-container';
import ProgressBarContainer from 'FileHasherWidget/components/progress-bar-container';
import ErrorContainer from 'FileHasherWidget/components/error-container';
import DownloadContainer from 'FileHasherWidget/components/download-container';
import PreviewContainer from 'FileHasherWidget/components/preview-container';
import HashContainer from 'FileHasherComponents/hash-container';
import FilenameContainer from 'FileHasherComponents/filename-container';

/**
 * Define a class of the widget
 */
class FileHasherWidget {
  constructor(configuration) {
    this.widgetId = configuration.widgetId;
    this.configurator = new ConfigurationService();
    this.configuration = configuration;
    this.provenFileConfiguration = configuration.file;
    this.observers = {};
    this.element = null;
  
    this.configurator.init(configuration);
    
    this.initializeObservers();
    this.initializeExternalObservers(configuration);
    this.init();
  }

  /**
   * Initialize the widget observers
   */
  initializeObservers() {
    this.observers = {
      // Events: widget
      widgetResetObserver: new EventObserver(),
      // Events: modes
      downloadModeInitiatedObserver: new EventObserver(),
      uploadModeInitiatedObserver: new EventObserver(),
      // Events: file downloading
      downloadingProgressObserver: new EventObserver(),
      downloadingStartedObserver: new EventObserver(),
      downloadingFinishedObserver: new EventObserver(),
      downloadingCanceledObserver: new EventObserver(),
      // Events: file hashing
      fileSelectedObserver: new EventObserver(),
      hashingProgressObserver: new EventObserver(),
      hashingStartedObserver: new EventObserver(),
      hashingFinishedObserver: new EventObserver(),
      hashingCanceledObserver: new EventObserver(),
      // Events: errors
      errorCaughtObserver: new EventObserver(),
      errorHiddenObserver: new EventObserver()
    };

    // reinitialize the widget if hashing process was canceled
    this.observers.hashingCanceledObserver.subscribe(() => {
      this.observers.uploadModeInitiatedObserver.broadcast();
    });

    // reinitialize the widget if reset button was clicked
    this.observers.widgetResetObserver.subscribe(() => {
      this.observers.uploadModeInitiatedObserver.broadcast();
    });
  }

  /**
   * Links all external events
   * @param configuration
   */
  initializeExternalObservers(configuration) {
    const self = this;
    if (configuration.observers) {
      const observerNames = Object.keys(configuration.observers);
      
      observerNames.forEach(observerName => {
        const observer = configuration.observers[observerName];
        switch (observerName.toLowerCase()) {
          case 'downloadingstarted':
            this.observers.downloadingStartedObserver.subscribe((filename) => observer(self.widgetId, filename));
            break;
          case 'downloadingcanceled':
            this.observers.downloadingCanceledObserver.subscribe(() => observer(self.widgetId));
            break;
          case 'downloadingprogress':
            this.observers.downloadingProgressObserver.subscribe((progress) => observer(self.widgetId, progress));
            break;
          case 'downloadingfinished':
            this.observers.downloadingFinishedObserver.subscribe(file => observer(self.widgetId, file));
            this.observers.fileSelectedObserver.subscribe(file => observer(self.widgetId, file));
            break;
          case 'hashcalculated':
            this.observers.hashingFinishedObserver.subscribe(({hash, file}) => observer(self.widgetId, hash, file));
            break;
          case 'hashingstarted':
            this.observers.hashingStartedObserver.subscribe(file => observer(self.widgetId, file));
            break;
          case 'hashingprogress':
            this.observers.hashingProgressObserver.subscribe((progress) => observer(self.widgetId, progress));
            break;
          case 'hashingcanceled':
            this.observers.hashingCanceledObserver.subscribe(() => observer(self.widgetId));
            break;
          case 'widgetreset':
            this.observers.widgetResetObserver.subscribe(() => observer(self.widgetId));
            break;
          default:
            break;
        }
      });
    }
  }

  /**
   * Creates all container elements and initialize them
   */
  init() {
    const widgetObserverMappers = getFileHasherObserverMappers();
    const {styles: {width: widgetWidget, align}, visibility} = this.configuration;
    this.element = VirtualDOMService.createElement('div', {
      classes: utils.extractClasses(styles, styleCodes.code),
      hidden: utils.extractClasses(styles, styleCodes.widget.hidden)
    });

    // container to drop and select user files
    this.element.dropContainer = (new DropContainer(this)).get();
    // container to preview all allowed files
    this.element.previewContainer = (new PreviewContainer(this)).get();

    // container to download file if it was listed in the configuration
    if (!!(this.provenFileConfiguration.url)) {
      this.element.downloadContainer = (new DownloadContainer(this)).get();
    }

    // container to display widget status title
    if (visibility.title) {
      this.element.titleContainer = (new TitleContainer(this)).get();
    }

    // container to display widget filename
    if (visibility.filename) {
      this.element.filenameContainer = (new FilenameContainer(this)).get();
    }

    // container to display hash
    if (visibility.hash) {
      this.element.hashContainer = (new HashContainer(this)).get();
    }

    // containers to display hashing/downloading progress
    if (visibility.progress) {
      this.element.hashProgressBar = (new ProgressBarContainer(this, widgetObserverMappers.hashProgressBar)).get();
      this.element.downloadProgressBar = (new ProgressBarContainer(this, widgetObserverMappers.downloadProgressBar)).get();
    }

    // container to display widget errors
    this.element.errorContainer = (new ErrorContainer(this)).get();

    // if the proven file was set, initialize the download mode
    if (!!(this.provenFileConfiguration.url)) {
      this.observers.downloadModeInitiatedObserver.broadcast(this.provenFileConfiguration);
    }

    this.element.attr('id', this.widgetId);
    this.element.style({width: `${widgetWidget}`});
    this.element.target().style
      .setProperty('--file-hasher-widget-alignment', align);
  }
  
  render() {
    return this.element.render();
  }
}

export default FileHasherWidget;
