import axios from "axios"
import { Component } from "react"
import './Dashboard.css'

class Dashboard extends Component {
    state = {
        email: localStorage.email,
        list: []
    }
    componentDidMount() {

        this.init()
    }

    init = () => {

        axios.post("/all", { "email": localStorage.email })
            .then((res) => {
                console.log('local storage: ', localStorage.email);
                this.setState({ list: res.data.links })
                console.log('list:  ', res.data.links)
            })
    }
    deleteItem = (key) => {
        axios.delete(`/${key}`).then((res) => {
            this.init()
        })

    }
    renderItem(item) {
        const url = `${window.location.host}/${item.key}`
        return (
            <li key={item.key} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.key}</div>
                    <span className="font-weight-light font-italic">{item.updatedAt}</span>
                </div>
                <a className="font-italic font-weight-light" href={url} target="_blank">{url}</a>
                &nbsp;&nbsp;&nbsp;
                <img onClick={() => this.deleteItem(item.key)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAtElEQVRIie2VQQ6CQAxFX8R7uPM4xsPgCTmFSzW6niUGBTezMnawLTIQecks+1+bzgD8G4Wjdg9sgeNAvXzNHah/Fb6L4Z3y1LFWTWWQSaf6JFhZulLSjeCYOQH/foMUntrx2d87p1xiMWOS4ssAYjFjkhNnE4s3UoEpowAa7G+4AdZSeGriJ3CzdBy5Ag+LGHx7TtYu4nc8H5FkbbaJ+9gALfqn1MZaFwd0/+YAlF7pwvx5Abo6e/T2cOSLAAAAAElFTkSuQmCC" />
                &nbsp;&nbsp;&nbsp;
                <span className="badge bg-secondary rounded-pill">{item.hitCount}</span>
            </li>

        )
    }
    render() {
        return (
            <>
                <h3 className="start">Link Dashboard</h3>

                <main className="mxy-5" style={{
                    "minHeight": "0px",
                    "maxHeight": "500px",
                    "overflowY": "scroll"
                }} >
                    <ol class="list-group list-group-numbered">
                        {
                            this.state.list.map(item => this.renderItem(item))
                        }

                    </ol>
                </main>
            </>
        );
    }
}

export default Dashboard;
