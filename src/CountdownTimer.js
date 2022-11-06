import React, { Component } from "react"

class CountdownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTimer: 50,
            secondTimer: 120,
            autostartFirstTimer: false,
            autostartSecondTimer: false,
            firstTimerLine: 400,
            secondTimerLine: 400,
            firstInterval: this.firstInterval,
            secondInterval: this.secondInterval,
        }
    }
    componentDidMount() {
        const { autostartFirstTimer, autostartSecondTimer } = this.state;
        if (autostartFirstTimer) {
            this.timerUp();
        } if (autostartSecondTimer) {
            this.timerDown()
        }
    }

    timerUp = () => {
        this.state.autostartFirstTimer = !this.state.autostartFirstTimer;
        if (this.state.autostartFirstTimer) {
            this.firstInterval = setInterval(() => {
                const { firstTimer, firstTimerLine } = this.state;
                this.setState({
                    firstTimer: firstTimer - 1,
                    firstTimerLine: firstTimerLine - (firstTimerLine / firstTimer)
                })
                document.querySelector('.firstLine').style.width = firstTimerLine - (firstTimerLine / firstTimer) + 'px';

            }, 1000)

        } if (!this.state.autostartFirstTimer) {
            clearInterval(this.firstInterval)
        }
    }
    timerDown = () => {
        this.state.autostartSecondTimer = !this.state.autostartSecondTimer;
        if (this.state.autostartSecondTimer) {
            this.secondInterval = setInterval(() => {
                let { secondTimer, secondTimerLine } = this.state;
                this.setState({
                    secondTimer: secondTimer - 2,
                    secondTimerLine: secondTimerLine - (secondTimerLine / secondTimer)
                })
                document.querySelector('.secondLine').style.width = secondTimerLine - (secondTimerLine / secondTimer) + 'px';
            }, 2000)
        } if (!this.state.autostartSecondTimer) {
            clearInterval(this.secondInterval)
        }
    }
    componentDidUpdate() {
        if (!this.state.firstTimer || this.state.firstTimer === 0) {
            clearInterval(this.timerUp);
        } else if (this.state.secondTimer || this.state.secondTimer === 0) {
            clearInterval(this.timerDown);
        }
    }
    fmtMSS(s) { if (s >= 0) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s } else return (s = "0.00") }
    render() {
        let { firstTimer, secondTimer } = this.state;
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