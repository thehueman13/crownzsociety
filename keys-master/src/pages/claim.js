import React, { Component } from "react"
import './index.css';
import './App.css';
import * as styles from './Home.module.css'
import Header from '../components/Header'
import gsap from 'gsap'
import * as auth from "../helpers/auth";

import { Helmet } from "react-helmet"

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      cwz: -1
    }

    this.order = React.createRef();
    this.variant = React.createRef();
    this.quantity = React.createRef();

    this.fname = React.createRef();
    this.lname = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();

    this.maddress = React.createRef();
    this.city = React.createRef();
    this.state = React.createRef();
    this.country = React.createRef();
    this.zip = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitNav = this.handleSubmitNav.bind(this);

  }

  handleSubmit = (event) => {

    const addy = auth.getAddress()

    const variant = this.variant.current.value
    const quantity = this.quantity.current.value

    if (this.state.cwz === -1) {
      event.preventDefault()
      return;
    }

    if (quantity > this.state.cwz) {
      alert("Can't claim more crowns than you own")
      event.preventDefault()
     return;
    }

    if (addy === 0) {
      alert("connect wallet")
      event.preventDefault()
      return;
    }

    if (variant === 0) {
      alert("select variant")
      event.preventDefault()
      return;
    }

    const fname = this.fname.current.value
    const lname = this.lname.current.value
    const email = this.email.current.value
    const phone = this.phone.current.value
    const maddress = this.maddress.current.value
    const city = this.city.current.value
    const state = this.state.current.value
    const country = this.country.current.value
    const zip = this.zip.current.value

    if (fname === "" || lname === "" || email === "" || phone === "") {
      alert("please fill out contact information")
      event.preventDefault()
      return;
    }

    if (maddress === "" || city === "" || state === "" || country === "" || zip === "") {
      alert("please fill out mailing address")
      event.preventDefault()
      return;
    }



    this.order.current.value = auth.generateCrownOrder(variant, quantity, fname, lname, email, phone, maddress, city, state, country, zip)
  }

  handleSubmitNav = (event) => {
    this.handleSubmit();
    this.form.current.submit()
  }

  openRequestForm() {
    gsap.set("#requestform", {
      zIndex: 2,
    }).then(() => {
      gsap.to("#requestform", {
        duration: 1,
        opacity: 1
      });
    })

  }

  closeRequestForm() {
    gsap.to("#requestform", {
      duration: 1,
      opacity: 0

    }).then(() => {
      gsap.set("#requestform", {
        zIndex: -1,
      });
    })

  }


  componentDidMount() {

    gsap.to("#vid", {
      duration: 2,
      filter: 'blur(0px)'
    });

    gsap.to("#request", {
      opacity: 1,
      delay: 1,
      duration: 2
    });

    const vid = document.getElementById('vid')
    vid.addEventListener('suspend', () => {
      vid.play();
    });
    auth.getNumCwz().then((cwz) => {
      this.setState({ cwz: cwz })
    });

  }

  render() {

    return (
      <><Helmet>
        <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="../images/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" />
        <title>Claim | Keys</title>
      </Helmet>
        <div style={{ backgroundColor: "#000", color: "#FFF" }} className={styles.bg}>
          <Header />

          <video id="vid" className={styles.bgvideo} src="https://keys.fra1.digitaloceanspaces.com/red.mp4" autoPlay loop muted playsInline />
          <div id="overlay" style={{ paddingTop: '35vh' }} className={styles.overlay}>

            <div
              id="requestform" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                zIndex: -1,
                justifyContent: "center",
                alignItems: "center",
                bottom: "auto",
                borderRadius: "10px",
                backgroundColor: 'rgba(0,0,0,0.95)',
              }}>
              <center>
                <input ref={this.fname} placeholder="FIRST NAME" type="text"></input>
                <br />
                <input ref={this.lname} placeholder="LAST NAME" type="text"></input>
                <br />
                <input ref={this.email} placeholder="EMAIL" type="email"></input>
                <br />
                <input ref={this.phone} placeholder="PHONE" type="phone"></input>
                <br />              <br />

                <input ref={this.maddress} placeholder="MAILING ADDRESS" type="text"></input>
                <br />
                <input ref={this.city} placeholder="CITY" type="text"></input>
                <br />
                <input ref={this.state} placeholder="STATE / PROVINCE" type="text"></input>
                <br />
                <input ref={this.zip} placeholder="ZIPCODE" type="number" min="0" step="1" />
                <br />
                <input ref={this.country} placeholder="COUNTRY" type="text"></input>
                <br /><br />


                CROWN STYLE:<br />
                <select ref={this.variant} type="text">
                  <option value={40766857052211}>
                    origin_black_gold
                  </option>
                  <option value={40766910136371}>
                    dragon_rogue
                  </option>
                  <option value={40766910169139}>
                    instinct_blue
                  </option>
                  <option value={40766910201907}>
                    golden_sun
                  </option>
                  <option value={40766910234675}>
                    royal_purple
                  </option>
                  <option value={40766910267443}>
                    black_molecular
                  </option>
                </select>
                <br />
                <br />
                <input ref={this.quantity} placeholder="QUANTITY" type="number" min="0" step="1" max="10" />

                <form action="https://keys.bloxx.space/claimcrown" onSubmit={this.handleSubmit} method="POST">
                  <input type="hidden" name="order" id="order" ref={this.order} />


                  <br />
                  <button style={{ padding: "1em" }} id="submit" >Submit Request</button>

                </form><br />
                <button style={{ padding: "1em" }} onClick={() => this.closeRequestForm()}  >Cancel</button>
              </center>
            </div>
            <button disabled={this.state.cwz < 1} style={{ marginTop: '8em' }} onClick={() => this.openRequestForm()} className={styles.lilcard} id="request" >Fill out Request</button>
          </div>

          <div id="footer" className={styles.footer}>
            19 Keys | ALL RIGHTS RESERVED.
          </div>
        </div>
      </>
    )
  }
}
