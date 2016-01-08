import React from 'react';

const propTypes = {
  className: React.PropTypes.string,
  onloadCallbackName: React.PropTypes.string,
  elementID: React.PropTypes.string,
  onloadCallback: React.PropTypes.func,
  verifyCallback: React.PropTypes.func,
  expiredCallback: React.PropTypes.func,
  render: React.PropTypes.string,
  sitekey: React.PropTypes.string,
  theme: React.PropTypes.string,
  type: React.PropTypes.string,
  verifyCallbackName: React.PropTypes.string,
  size: React.PropTypes.string,
  tabindex: React.PropTypes.string,
};

const defaultProps = {
  elementID: 'g-recaptcha',
  onloadCallback: undefined,
  onloadCallbackName: 'onloadCallback',
  verifyCallback: undefined,
  verifyCallbackName: 'verifyCallback',
  expiredCallback: undefined,
  expiredCallbackName: 'expiredCallback',
  render: 'onload',
  theme: 'light',
  type: 'image',
  size: 'normal',
  tabindex: '0',
};

export default class Recaptcha extends React.Component {

  componentDidUpdate() {
    // Do not continue if server side.
    if (typeof document === 'undefined') {
      return;
    }

    const captchaElement = document.getElementById(this.props.elementID).innerHTML;
    if (this.props.render === 'explicit' && this.props.onloadCallback && captchaElement.length === 0) {
      window[this.props.onloadCallbackName] = () => {
        grecaptcha.render(this.props.elementID, {
          sitekey: this.props.sitekey,
          callback: (this.props.verifyCallback) ? this.props.verifyCallback : undefined,
          theme: this.props.theme,
          type: this.props.type,
          size: this.props.size,
          tabindex: this.props.tabindex,
          'expired-callback': (this.props.expiredCallback) ? this.props.expiredCallback : undefined,
        });

        if (this.props.onloadCallback) {
          this.props.onloadCallback();
        }
      };

      const scriptLocation = document.getElementById('recaptcha-load-scripts');
      const captcha = document.createElement('script');
      captcha.src = `https://www.google.com/recaptcha/api.js?onload=${this.props.onloadCallbackName}&render=explicit`;
      captcha.async = true;
      captcha.defer = true;
      scriptLocation.appendChild(captcha);
    }
  }

  render() {
    // Do not render serverside.
    if (typeof document === 'undefined') {
      return false;
    }

    if (this.props.render === 'explicit' && this.props.onloadCallback) {
      return (
        <div>
          <div id="recaptcha-load-scripts"></div>
          <div id={this.props.elementID}
            data-onloadcallbackname={this.props.onloadCallbackName}
            data-verifycallbackname={this.props.verifyCallbackName}
            >
          </div>
        </div>
      );
    }

    return (
      <div className="g-recaptcha"
        data-sitekey={this.props.sitekey}
        data-theme={this.props.theme}
        data-type={this.props.type}
        data-size={this.props.size}
        data-tabindex={this.props.tabindex}
        >
      </div>
    );
  }
}

Recaptcha.propTypes = propTypes;
Recaptcha.defaultProps = defaultProps;
