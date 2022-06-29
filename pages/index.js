import {useSession, signIn, signOut} from 'next-auth/react';
import {React, useEffect, useState} from 'react';
import styles from '/styles/Home.module.css'
import Head from 'next/head';
import { BiSearch } from 'react-icons/bi';
import { FaMicrophone } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { RiEditBoxLine } from 'react-icons/ri';

import { Button, Text } from '@nextui-org/react';
import { motion } from "framer-motion"
import { style } from 'dom-helpers';
// import html2canvas from 'html2canvas'

export default function Home() {
  const {data: session} = useSession();
  const [phoneIsVisible, setPhoneVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [profile, setProfile] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);


  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists');
    const {items} = await res.json();
    setPlaylists(items);
  };

  const getProfile = async () => {
    const res = await fetch('/api/profile');
    const prof = await res.json();
    setProfile(prof);
  };

  const getArtists = async () => {
    const res = await fetch('/api/top/artists');
    const {artists} = await res.json();
    setTopArtists(artists);

    const res2 = await fetch('/api/profile');
    const prof = await res2.json();
    setProfile(prof);

    setPhoneVisible(true);
  };


  const getTracks = async () => {
    const res = await fetch('/api/top/tracks');
    const {tracks} = await res.json();
    setTopTracks(tracks);
  };

  const randomTexts = [
    'Hey, ' + profile.display_name + ", let's get lunch",
    'When are we recording?',
    profile.display_name + ', I miss "us" 😢',
    'Call me back ASAP, I need ur advice',
    'Thanks again for saving my life 🥹',
    'Are you coming to my birthday party? I got u a gift',
    'Will you pls be in my music video?',
    "I'm glad my kidney was a match",
    "What's for dinner? 🤭", 
    "Make sure to bring a jacket 🥶",
    "U up?",
    "Yo, u comin' to the afterparty?",
    "U made HOW MUCH last year?!",
    "R u ignoring me?",
    "Great minds think alike 🤝",
    "Me. You. Paris. This Friday?",
    "CONGRATS 🎉 on the Nobel!",
    "Your new book... it was SO good",
    "Wyd, " + profile.display_name + "?",
    "Snap?",
    "Sorry... U were right",
    "LOL u crack me up"
  ]

  const randomTextsNoRepeats = (array) => {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }
  
  var chooseText = randomTextsNoRepeats(randomTexts);

  useEffect(() => {
    getArtists();
  }, []);

  if (session) {

    return (
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400&display=swap" rel="stylesheet"></link>
        </Head>
        <main className={styles.main}>
        <div className={styles.titleforpage}>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.9 }} className={styles.titlewrapper}>
          <Text
            h1
            size={50}
            css={{
              textGradient: "25deg, #00ff5e 0%, #ffd000 90%",
            }}
            weight="bold"
          >Spotify DMs
          </Text>
        </motion.button>
      </div>
          {/* <div className={styles.signedinastext}>
            <Text
            h1
            size={20}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            signed
          </Text>
          <Text
            h1
            size={20}
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
            weight="bold"
          >
            in as
          </Text>
          <Text
            h1
            size={20}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            {session?.token.email}
          </Text>
                  {/* buttons (sign out + check dms) */}
              {/* <div className={styles.buttonwrapper}>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.buttons}>
                  <div className={styles.buttonshadow}>
                    <Button color="warning" auto ghost onClick={() => signOut()}>Sign Out</Button>
                    </div>
                </motion.button>
                
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.buttons}>
                  <div className={styles.buttonshadow}>
                    <Button color="error" auto ghost onClick={() => getArtists()}>Check DMs</Button>
                    </div>
                </motion.button>
              </div> */}
        {/* </div> */} 
          {/* subtitle with buttons */}
          <div className={styles.signedinas}>
            {/* buttons (sign out + check dms) */}
              <div className={styles.buttonwrapper}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.buttons}>
                  <div className={styles.buttonshadow}>
                    <Button color="success" auto ghost onClick={() => getArtists()}>Refresh</Button>
                    </div>
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.buttons}>
                  <div className={styles.buttonshadow}>
                    <Button color="warning" auto ghost onClick={() => signOut()}>Sign Out</Button>
                    </div>
                </motion.button>
              
              </div>
           </div>
        {/* text messages from top artists */}
        <div className={styles.phone} style={{display: phoneIsVisible ? 'flex' : 'none'}}>
          <div>
            <span className={styles.edit}>Edit</span>
            <span className={styles.messages}>Messages</span>
            <span className={styles.editicon}><RiEditBoxLine></RiEditBoxLine></span>
          </div>
          <div className={styles.searchbar}>
            <div style={{position: 'relative', top: 2, left: -4}}><BiSearch/></div>
            Search
            <div style={{position: 'relative', top: 2, right: -157}}><FaMicrophone/></div>
          </div>
          <div className={styles.topartist}>
            <img className={styles.number1artist}src={topArtists[0]?.image}/>
            <div className={styles.topartistname}>{topArtists[0]?.name}</div>
          </div>

          <div className={styles.texts}>
              <div className={styles.artist}>
                <div className={styles.bluedot} ></div>
                <img className={styles.artistimage} src={topArtists[1]?.image}/>
                <div style={{marginBottom: 2}}>
                   <span className={styles.artistname}>{topArtists[1]?.name}</span>
                   <span className={styles.arrow}><IoIosArrowForward/></span>
                   <span className={styles.time}>7:{(topArtists[1]?.popularity)%60 < 10 ? '0' + (topArtists[1]?.popularity)%60 : (topArtists[1]?.popularity)%60} PM</span>
                </div>
                <div className={styles.txtmsg}>{chooseText()}</div>
                <div className={styles.line} style={{top: 8}}></div>

              </div>

              <div className={styles.artist}>
              <div className={styles.bluedot2} ></div>
                <img className={styles.artistimage} src={topArtists[2]?.image}/>
                <div style={{marginBottom: 2}}>
                   <span className={styles.artistname}>{topArtists[2]?.name}</span>
                   <span className={styles.arrow}><IoIosArrowForward/></span>
                   <span className={styles.time}>6:{(topArtists[2]?.popularity)%60 < 10 ? '0' + (topArtists[2]?.popularity)%60 : (topArtists[2]?.popularity)%60} PM</span>
                </div>
                <div className={styles.txtmsg}>{chooseText()}</div>
                <div className={styles.line} style={{top: 70}}></div>
              </div>

              <div className={styles.artist}>
                <img className={styles.artistimage} src={topArtists[3]?.image}/>
                <div style={{marginBottom: 2}}>
                   <span className={styles.artistname}>{topArtists[3]?.name}</span>
                   <span className={styles.arrow}><IoIosArrowForward/></span>
                   <span className={styles.time}>4:{(topArtists[3]?.popularity)%60 < 10 ? '0' + (topArtists[3]?.popularity)%60 : (topArtists[3]?.popularity)%60} PM</span>
                </div>
                <div className={styles.txtmsg}>{chooseText()}</div>
                <div className={styles.line} style={{top: 130}}></div>
              </div>

              <div className={styles.artist}>
                  <div className={styles.bluedot3} ></div>
                  <img className={styles.artistimage} src={topArtists[4]?.image}/>
                  <div style={{marginBottom: 2}}>
                    <span className={styles.artistname}>{topArtists[4]?.name}</span>
                    <span className={styles.arrow}><IoIosArrowForward/></span>
                    <span className={styles.time}>1:{(topArtists[4]?.popularity)%60 < 10 ? '0' + (topArtists[4]?.popularity)%60 : (topArtists[4]?.popularity)%60} PM</span>
                  </div>
                  <div className={styles.txtmsg}>{chooseText()}</div>
                  <div className={styles.line} style={{top: 190}}></div>
              </div>

              <div className={styles.artist}>
                  <img className={styles.artistimage} src={topArtists[5]?.image}/>
                  <div style={{marginBottom: 2}}>
                    <span className={styles.artistname}>{topArtists[5]?.name}</span>
                    <span className={styles.arrow}><IoIosArrowForward/></span>
                    <span className={styles.time}>11:{(topArtists[5]?.popularity)%60 < 10 ? '0' + (topArtists[5]?.popularity)%60 : (topArtists[5]?.popularity)%60} AM</span>
                  </div>
                  <div className={styles.txtmsg}>{chooseText()}</div>
                  <div className={styles.line} style={{top: 252}}></div>
              </div>

              <div className={styles.artist}>
                  <img className={styles.artistimage} src={topArtists[6]?.image}/>
                  <div style={{marginBottom: 2}}>
                    <span className={styles.artistname}>{topArtists[6]?.name}</span>
                    <span className={styles.arrow}><IoIosArrowForward/></span>
                    <span className={styles.time}>9:{(topArtists[6]?.popularity)%60 < 10 ? '0' + (topArtists[6]?.popularity)%60 : (topArtists[6]?.popularity)%60} AM</span>
                  </div>
                  <div className={styles.txtmsg}>{chooseText()}</div>
              </div>
          </div>

        </div>

          {/* {topArtists.map((x) => (
            <div key={x.name}>
              <h1>{(x.name)}</h1>
            </div>
          ))} */}

        </main>

        <footer>
          made by rachel nguyen
        </footer>
      </>
    );
  }
  return (
    <>
      <div className={styles.titleforpage}>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.9 }} className={styles.titlewrapper}>
          <Text
            h1
            size={50}
            css={{
              textGradient: "25deg, #00ff5e 0%, #ffd000 90%",
            }}
            weight="bold"
          >Spotify DMs
          </Text>
        </motion.button>
      </div>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.titlewrapper}>
        <button className={styles.signinbutton} onClick={() => signIn()}>Check Messages
        <div className={styles.arrow2}><IoIosArrowForward/></div>
        </button>
        </motion.button>

    </>
  );
}