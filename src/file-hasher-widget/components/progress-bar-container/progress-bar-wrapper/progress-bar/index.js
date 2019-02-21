import virtualDOMService from '../../../../../common/services/virtual-dom';
import utils from '../../../../../common/services/utils';
import styleCodes from '../../../style-codes';
import styles from './index.scss';

/**
 * ProgressBar
 */
class ProgressBar {
  constructor(widget) {
    this.element = null;
    this.widget = widget;
    this.init();
  }
  
  init() {
    this.element = virtualDOMService.createElement('div', {
      classes: utils.extractClasses(styles, styleCodes.progress.bar.code)
    });
  
    // Initialize the observers
    this.widget.observers.dropContainerHashingProgressObserver.subscribe((data) => {
      this.hashingProgressObserver(data)
    });
  }
  
  hashingProgressObserver(progress) {
    this.element.style({width: `${progress}%`});
  }
  
  get() {
    return this.element;
  }
}

export default ProgressBar;
