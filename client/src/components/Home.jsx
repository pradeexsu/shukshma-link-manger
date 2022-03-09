import "./Home.css"
import { Component } from "react"
var QRCode = require('qrcode')

class Home extends Component {

    createQRCode() {
        var canvas = document.getElementById('canvas')
        var slug = document.getElementById('urlSlug').innerHTML

        QRCode.toCanvas(canvas, `http://localhost:4000/${slug}`, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }
    render() {
        return (
            <main className="px-3">
                <h1>Link Manager</h1>
                <p className="lead">
                    Short, Share, Track it!
                </p>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control-lg"
                        id="exampleFormControlInput1"
                        placeholder="https://github.com/..." />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control-lg"
                        id="urlSlug"
                        placeholder="slug" />
                </div>

                <p className="lead">
                    <a
                        href="#"
                        className="btn btn-lg btn-secondary fw-bold border-white bg-white text-dark"
                        onClick={this.createQRCode}
                    >
                        Short it!
                    </a>
                </p>

                <div className="text-center">
                    <canvas id="canvas" className="rounded"></canvas>
                </div>

            </main>
        );
    }
}

export default Home;
