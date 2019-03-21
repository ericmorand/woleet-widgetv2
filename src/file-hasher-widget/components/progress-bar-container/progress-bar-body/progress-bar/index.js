import VirtualDOMService from 'Common/services/virtual-dom';
import utils from 'Common/services/utils';
import styleCodes from 'FileHasherComponents/style-codes';
import styles from './index.scss';

/**
 * ProgressBar
 */
class ProgressBar {
  constructor(widget, observerMapper) {
    this.element = null;
    this.widget = widget;
    this.observerMapper = observerMapper;
    this.init();
  }
  
  init() {
    this.element = VirtualDOMService.createElement('div', {
      classes: utils.extractClasses(styles, styleCodes.progress.bar.code)
    });

    this.initializeObservers();
  }

  // Initialize the observers
  initializeObservers() {
    if (this.observerMapper['processProgressObserver']) {
      let processProgressObserver = this.observerMapper['processProgressObserver'];
      this.widget.observers[processProgressObserver].subscribe((data) => {
        this.processProgress(data)
      });
    }
  }

  processProgress(progress) {
    this.element.style({width: `${progress}%`});
  }
  
  get() {
    return this.element;
  }
}

export default ProgressBar;
