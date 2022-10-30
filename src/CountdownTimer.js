import React, { Component } from "react"

class CountdownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTimer: 50,
            secondTimer: 120,
            autostart: false,
            firstTimerLine: 400,
            secondTimerLine: 400,
        }
    }
    componentDidMount() {
        const { autostart } = this.state;
        if (autostart) {
            this.timer();
        }
    }

    timerUp = () => {

        this.state.autostart = !this.state.autostart;
        if (this.state.autostart) {
            this.interval = setInterval(() => {
                const { firstTimer, firstTimerLine, firstTimerLineOnTime } = this.state;
                this.setState({
                    firstTimer: firstTimer - 1,
                    firstTimerLine: firstTimerLine - (firstTimerLine / firstTimer)
                })
                document.querySelector('.firstLine').style.width = firstTimerLine - (firstTimerLine / firstTimer) + 'px';
               
            }, 1000)

        } if (!this.state.autostart) {
            clearInterval(this.interval)
        }
    }
    timerDown = () => {
        this.state.autostart = !this.state.autostart;
        if (this.state.autostart) {
            this.interval = setInterval(() => {
                let { secondTimer, secondTimerLine, secondTimerLineOnTime } = this.state;
                this.setState({
                    secondTimer: secondTimer - 2,
                    secondTimerLine: secondTimerLine - (secondTimerLine / secondTimer)
                })
                document.querySelector('.secondLine').style.width = secondTimerLine - (secondTimerLine / secondTimer) + 'px';
            }, 2000)
        } if (!this.state.autostart) {
            clearInterval(this.interval)
        }
    }
    componentDidUpdate(prevState) {
        if (prevState.firstTimer !== this.state.firstTimer && prevState.secondTimer !== this.state.secondTimer && this.state.firstTimer === 0 && this.state.secondTimer === 0) {
            clearInterval(this.timer);
            if (this.props.onTimesup) {
                this.props.onTimesup();
            }
        }
    }
    fmtMSS(s) { if (s >= 0) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s } else return (s = "0.00") }
    render() {
        let { firstTimer, secondTimer, firstTimerLine, secondTimerLine } = this.state;
        return (
            <>
                {this.fmtMSS(firstTimer)}
                <div className="wrapper" ><div className="firstLine"></div></div>
                <button className="btn" onClick={this.timerUp}>Start / Pause</button>
                <br></br>
                {this.fmtMSS(secondTimer)}
                <div className="wrapper"><div className="secondLine"></div></div>
                <button className="btn" onClick={this.timerDown}>Start / Pause</button>

            </>
        )

    }
}

export default CountdownTimer