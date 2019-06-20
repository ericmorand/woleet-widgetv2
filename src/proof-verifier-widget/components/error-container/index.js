import VirtualDOMService from 'Common/services/virtual-dom';
import utils from 'Common/services/utils';
import styleCodes from 'ProofVerifierComponents/style-codes';
import styles from './index.scss';

/**
 * ErrorContainer
 *
 * It displays all possible errors
 */
class ErrorContainer {
  constructor(widget) {
    this.element = null;
    this.widget = widget;
    this.lang = this.widget.configurator.getLanguage();
  
    this.init();
  }

  /**
   * Create all container elements and initialize them
   */
  init() {
    this.element = VirtualDOMService.createElement('div', {
      classes: utils.extractClasses(styles, styleCodes.error.container.code)
    });
    this.element.title = VirtualDOMService.createElement('span', {
      classes: utils.extractClasses(styles, styleCodes.error.code)
    });

    this.hideErrorElement();
    this.initializeObservers();
  }

  /**
   * Initialize the observers
   */
  initializeObservers() {
    this.widget.observers.errorCaughtObserver.subscribe((data) => {
      this.errorCaught(data)
    });
  }

  /**
   * If an error was caught display the element and the error
   * @param error
   */
  errorCaught(error) {
    const self = this;
    self.element.show();
  
    if (error && error.message) {
      self.element.title.text(utils.translate(`errors.${error.message}.main`, this.lang));
    } else {
      let errorMessage = '';

      switch (error) {
        case 'url_not_found':
          errorMessage = utils.translate(`errors.proof_receipt_not_found`, self.lang);
          break;
        default:
          errorMessage = utils.translate(`errors.${error}`, self.lang);
          break;
      }

      self.element.title.text(errorMessage);
    }
  }

  /**
   * Hide the element and clear an error text
   */
  hideErrorElement() {
    this.element.title.text('');
    this.element.hide();

    this.widget.observers.errorHiddenObserver.broadcast();
  }
  
  get() {
    return this.element;
  }
}

export default ErrorContainer;
