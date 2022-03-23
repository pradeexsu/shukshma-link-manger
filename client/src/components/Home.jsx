import "./Home.css"
import { Component } from "react"
import axios from "axios"
import ShareLink from "./ShareLink"
import Notification from './Notification';

class Home extends Component {
    state = {
        loading: false,
        url: '',
        key: '',
        msg: '',
        msgType: '',
        shortLink: '',
        shareLink: null,
        email: ''
    }
    slugPattern = RegExp('^[-\\w]*$')

    uriPattern = RegExp('^(https?:\\/\\/)?(www.)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

    getLoadingState() {
        return (<>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            &nbsp;Loading...
        </>)
    }
    init = () => {
        axios.get("/api/current_user")
            .then((res) => {
                this.setState({ email: res.data.email })
                localStorage.setItem('email', this.state.email)
            })

    }
    componentDidMount() {
        const uri = document.getElementById("exampleFormControlInput1")
        uri.focus()
        this.init()
    }

    handleUrlChange = (event) => {
        this.setState({ url: event.target.value });
    }
    handleKeyChange = (event) => {
        this.setState({ key: event.target.value });
    }

    shortItCalled = () => {
        this.setState({
            loading: true,
            msg: '',
            shareLink: ''
        })
        const uri = document.getElementById("exampleFormControlInput1")
        const slug = document.getElementById("urlSlug")

        if (!this.uriPattern.test(this.state.url.trim())) {
            uri.focus()
            uri.classList.add("apply-shake")
            setTimeout(() => uri.classList.remove("apply-shake"), 1000)
            this.setState({ loading: false })
            return
        } else if (!this.slugPattern.test(slug.value.trim())) {
            slug.focus()
            slug.classList.add("apply-shake")
            setTimeout(() => slug.classList.remove("apply-shake"), 1000)
            this.setState({ loading: false })
            return
        }
        const url = '/';

        this.postLink(url)

    }

    genrateQRCode = (url) => {
        var QRCode = require('qrcode')
        var canvas = document.getElementById('canvas')

        QRCode.toCanvas(document.getElementById('canvas'), url, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })

    }
    postLink = (url) => {
        const timeStamp = setTimeout(() => {
            this.setState({
                'shareLink': null,
                loading: false,
                msg: 'unable to connect server',
                msgType: 'danger'
            })
        }, 10000);

        axios.post(url, {
            key: this.state.key,
            link: this.state.url,
            email: this.state.email
        }).then((response) => {
            const data = response.data
            const key = data._doc ? data._doc.key : '';
            const url = `${window.location.host}/${key}`
            this.setState({
                'shareLink': key ? (<ShareLink url={url} _key={`/${key}`} />) : null,
                loading: false,
                msg: response.data.msg,
                msgType: response.data.status
            })
            this.genrateQRCode(url)
            clearTimeout(timeStamp);
        }).catch((err) => {
            this.setState({
                'shareLink': null,
                loading: false,
                msg: 'unable to connect server',
                msgType: 'danger'
            })
        })

    }

    render() {
        return (
            <main className="px-3">
                {this.state.loading ?
                    ""
                    : <Notification msg={this.state.msg} msgType={this.state.msgType} />
                }
                <h2>Link Manager</h2>
                <p className="lead">
                    Short, Share, Track it!
                </p>

                <div className="mb-3">
                    <input
                        type="text"
                        value={this.state.url}
                        onChange={this.handleUrlChange}
                        className="form-control-lg"
                        id="exampleFormControlInput1"
                        placeholder="https://github.com/..." />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        value={this.state.key}
                        onChange={this.handleKeyChange}
                        className="form-control-lg"
                        id="urlSlug"
                        placeholder="slug" />
                </div>
                <br />
                <span className='lead'>
                    {this.state.shareLink || this.state.msg}
                </span>
                <br />
                <p className="lead">
                    <button
                        href="#"
                        className="btn btn-lg btn-secondary fw-bold border-white bg-white text-dark"
                        disabled={this.state.loading}
                        onClick={this.shortItCalled}>
                        {this.state.loading ?
                            this.getLoadingState()
                            : <span>&nbsp;&nbsp;&nbsp;Short it!&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                    </button>
                </p>

                <div className="text-center">
                    <canvas id="canvas" className="rounded"></canvas>
                </div>


            </main>
        );
    }
}

export default Home;
