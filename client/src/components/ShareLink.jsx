import { Component } from "react"
import $ from 'jquery';
import "./ShareLink.css"


class ShareLink extends Component {
    state = {}
    componentDidMount() {
        var $shareBtn = $('.share-btn');
        var $shareUrl = $('.share-url');
        var $shareContainer = $('.share-container');
        var $notificationButton = $('.notification-button');

        var $url = this.props.url;
        var $key = this.props._key;
        
        var $shared = false;
        $shareBtn.text($key);


        function shareLink(e) {

            $shareBtn.toggleClass('active');
            $shareUrl.toggleClass('active');
            $shareContainer.toggleClass('active');

            if ($shared === false) {

                $notificationButton.toggleClass('active');
                $shared = true;
                $shareBtn.text($key);
                $shareUrl.text($url);

                copyToClipboard($url)

            } else {
                $shared = false;
                $shareBtn.text($key);
            }
        }
        const copyToClipboard = (text) => {
            const textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
            textarea.value = text;
            textarea.select();
            textarea.setSelectionRange(0, 99999);
            document.execCommand('copy');
            document.body.removeChild(textarea);
        };

        function fadeOutNotification() {
            setTimeout(function () {
                $notificationButton.removeClass('active');
            }, 2000);
        }

        // bind events
        $shareBtn.on('click', shareLink);
        $notificationButton.on('transitionend', fadeOutNotification);
    }
    render() {
        return (
            <>
                <div className="animate slide-in-down notification-button">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABUUlEQVQ4jdWUvUoDQRDH/7P3kZCEK8wDWEmwkYCNrRLsJYgQn0HBtxAbbX0AO4mPINgZCGntg4UWwdtA7mtvxyK5qPGS3OE1/ppdZpnf7sDMAgVDyWY48k5BdExAdWUCQQWK+u9kX+3VSaYKh6OgQ8R3WV/hRxqup152N53txTMxvZVPssoSgpgbaXExW528Qq2Z0uJmXtF39q8HXK9aUvpRz0Wt/Xy+JcX6tLU4zNQqqXEX+Cr5z3DMzWKFBKNQYcI/ETIjzJMUxozUJsSsD5XmvtJ8mEUWxYyPiUKoGSLFagLAG5UvLW985CtuMKdPwByaSm+fXlEt/Z4LEwBmv8Z80A9uBrzKKQio2CZsY3q30vqncJGNiiWRcb4jzZiEMWyD/KVC6Uc9BrVo5TsTmYJmwBDifqnQRa1dVvIh1ryDNa1lGRRYhtl9vGieZSgoP5/IzX8QZMC8dAAAAABJRU5ErkJggg=="/>
                     &nbsp; Link Copied to Clipboard
                </div>

                <div className="container">
                    <div className="share-container">
                        <div className="share-btn">Share</div>
                        <div contentEditable="false" className="share-url" id="url"></div>
                    </div>
                </div>
            </>
        );
    }
}

export default ShareLink;