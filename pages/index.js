import {useSession, signIn, signOut} from 'next-auth/react';
import {React, useEffect, useState} from 'react';
import styles from '/styles/Home.module.css'
import Head from 'next/head';
import { BiSearch } from 'react-icons/bi';
import { FaMicrophone } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { Button, Text } from '@nextui-org/react';
import { motion } from "framer-motion"
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
    "Sorry... u were right"
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


  if (session) {
    return (
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400&display=swap" rel="stylesheet"></link>
        </Head>
        <main className={styles.main}>
          <div className={styles.signedinas}>
        {/* <Text
            h1
            size={22}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            signed in as
          </Text>
          <Text
            h1
            size={22}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            {session?.token?.email}
          </Text> */}
          {/* <Text
            h1
            size={25}
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
            weight="bold"
          >
            in as
          </Text>
          <Text
            h1
            size={25}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            {session?.token?.email}
          </Text> */}
          
          <div style={{position: 'relative', top: 10, display: 'flex', flexDirection:'row', justifyContent: 'space-between', marginBottom: 50}}>
          
          <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{
      backgroundColor: 'transparent',
      padding: 0,
      borderRadius: 15,
      border: 'none'
    }}
  ><div style={{
    marginRight: 15,
    borderRadius: 15,
    webkitBoxShadow: '0px 10px 13px -7px #000000, -1px 3px 11px 1px rgba(0,0,0,0)',
boxShadow: '0px 10px 13px -7px #000000, -1px 3px 11px 1px rgba(0,0,0,0)',
  }}><Button color="warning" auto ghost onClick={() => signOut()}>Sign Out</Button></div></motion.button>
          
          <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{
      backgroundColor: 'transparent',
      padding: 0,
      borderRadius: 15,
      border: 'none'
    }}>
      <div style={{
    borderRadius: 15,
    webkitBoxShadow: '0px 10px 13px -7px #000000, -1px 3px 11px 1px rgba(0,0,0,0)',
boxShadow: '0px 10px 13px -7px #000000, -1px 3px 11px 1px rgba(0,0,0,0)',
  }}>
          <Button color="success" auto ghost onClick={() => getArtists()}>Check DMs</Button></div></motion.button>


          </div>
        
        {/* {playlists.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <img src={item.images[0]?.url} width="100" />
          </div>
        ))} */}

</div>
        <div className={styles.phone} style={{display: phoneIsVisible ? 'flex' : 'none'}}>
          <div className={styles.messages}>Messages</div>
          <div className={styles.searchbar}>
            <div style={{position: 'relative', top: 2, left: -4}}><BiSearch/></div>
            Search
            <div style={{position: 'relative', top: 2, right: -157}}><FaMicrophone/></div>
          </div>
          <div className={styles.topartist}>
            <img className={styles.number1artist}src={topArtists[0]?.image}/>
            <text style={{color: '#8c8c8c', textTransform: 'none', position: 'relative', top: 23, fontSize: 13, fontWeight: 400, fontFamily: 'Roboto'}}>{topArtists[0]?.name}</text>
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
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}