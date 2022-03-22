import "./Home.css"
import { Component } from "react"
import axios from "axios"
import ShareLink from "./ShareLink"
import Notification from './Notification';
const canvas = document.getElementById('canvas')
const qrcode = require('qrcode')

class Home extends Component {
    state = {
        loading: false,
        BASE_URI: 'http://localhost:5000',
        url: '',
        key: '',
        msg: '',
        msgType: '',
        shortLink: '',
        shareLink: null
    }

    getLoadingState() {
        return (<>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            &nbsp;Loading...
        </>)
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
        const url = 'http://localhost:5001/api/v1/url';
        axios.post(url, {
            key: this.state.key,
            link: this.state.url,
            email: ''
        }).then((response) => {
            console.log(response)
            // this.setState({
            //     loading: false,
            //     msg: response.data.msg
            // })
            const data = response.data
            const key = data._doc ? data._doc.key : '';
            console.log(key)
            const url = `localhost:5001/api/v1/url/${key}`
            console.log('url', url)
            this.setState({
                'shareLink': key ? (<ShareLink url={url} _key={`/${key}`} />) : null,
                loading: false,
                msg: response.data.msg,
                msgType: response.data.status
            })

            // this.createQRCode(response.data.link)

        })
        // setTimeout(() => this.setState({ loading: false }), 2000);
    }


    render() {
        return (
            <main className="px-3">
                {this.state.loading ?
                    ""
                    : <Notification msg={this.state.msg} msgType={this.state.msgType} />
                }
                <h1>Link Manager</h1>
                <p className="lead">
                    Short, Share, Track it!
                </p>

                <div className="mb-3">
                    <input
                        type="text"
                        value={this.state.url || 'google.com'}
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
