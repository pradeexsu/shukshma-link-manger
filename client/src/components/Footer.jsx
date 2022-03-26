const Footer = (props) => {
    return (
        <footer className="mt-auto text-white-50">
            <p >
                Made with 💙 in India | team Shuksma <br />
                developer <a href="https://github.com/sutharp777" className="text-white">
                    @sutharp777
                </a>,&nbsp;
                tester&nbsp;
                <a href="https://github.com/sutharp777" className="text-white">
                    @ankit
                </a>,&nbsp;
                report&nbsp;
                <a href="https://github.com/sutharp777" className="text-white">
                    @manan
                </a>, and&nbsp;
                cloud&nbsp;
                <a href="https://github.com/sutharp777" className="text-white">
                    @rohit
                </a>
                <hr />
            </p>
            <ul class="nav justify-content-between pb-3 mb-3">
                {/* <li class="nav-item"><img height="33" src="./express.png"/></li> */}
                <li class="nav-item"><img height="35" src="./node.png" /></li>
                <li class="nav-item"><img height="35" src="./react.png" /></li>
                <li class="nav-item"><img height="35" src="./redux.png" /></li>
                {/* <li class="nav-item"><img height="35" src="./bootstrap.png" /></li> */}
                <li class="nav-item"><img height="35" src="./deocean.png" /></li>
            </ul>
        </footer>
    );
}

export default Footer;