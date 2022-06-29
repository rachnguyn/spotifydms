import {useSession, signIn, signOut} from 'next-auth/react';
import {React, useEffect, useState} from 'react';
import styles from '/styles/Home.module.css'
import Head from 'next/head';
import { BiSearch } from 'react-icons/bi';
import { FaMicrophone } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { Button, Text } from '@nextui-org/react';
// import { motion } from "framer-motion"

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
        <Text
            h1
            size={30}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            Signed
          </Text>
          <Text
            h1
            size={30}
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
            weight="bold"
          >
            in as
          </Text>
          <Text
            h1
            size={30}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            {session?.token?.email}
          </Text>
          <div style={{position: 'relative', top: 10, display: 'flex', flexDirection:'row', justifyContent: 'space-between', marginBottom: 50}}>
          <Button color="error" auto onClick={() => signOut()}>Sign Out</Button>
          <Button color="gradient" auto onClick={() => getArtists()}>Check DMs</Button>
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
            <text style={{color: '#8c8c8c', position: 'relative', top: 23, fontSize: 13, fontWeight: 400, fontFamily: 'Roboto'}}>{topArtists[0]?.name}</text>
          </div>
          <div className={styles.texts}>
              <div className={styles.artist}>
              <div className={styles.bluedot} ></div>
              <img className={styles.artistimage} src={topArtists[1]?.image}/>
                <text style={{fontSize: 13, position: 'relative', left: 60, top: -42, fontWeight: 300, fontFamily: 'Roboto'}}>{topArtists[1]?.name}</text>
                <text style={{fontSize: 11, position: 'relative', right: -195, top: -62, fontWeight: 300, fontFamily: 'Roboto', color: '#8c8c8c'}}>7:{(topArtists[1]?.popularity)%60 < 10 ? '0' + (topArtists[1]?.popularity)%60 : (topArtists[1]?.popularity)%60} PM</text> 
                <div style={{fontSize: 11, position: 'relative', right: -240, top: -76, color: 'grey'}}><IoIosArrowForward/></div>
                <text style={{ lineHeight: '100%',fontSize: 11, position: 'relative', left: 60, top: -75, fontWeight: 400, fontFamily: 'Roboto', color: '#8c8c8c', marginRight: 70}}>
                  {chooseText()}
                </text>
                <div className={styles.line} style={{top: 10}}></div>

              </div>

              <div className={styles.artist}>
              <div className={styles.bluedot2} ></div>

              <img className={styles.artistimage} src={topArtists[2]?.image}/>
                <text style={{fontSize: 13, position: 'relative', left: 60, top: -42, fontWeight: 300, fontFamily: 'Roboto'}}>{topArtists[2]?.name}</text>
                <text style={{fontSize: 11, position: 'relative', right: -195, top: -62, fontWeight: 300, fontFamily: 'Roboto', color: '#8c8c8c'}}>6:{(topArtists[2]?.popularity)%60 < 10 ? '0' + (topArtists[2]?.popularity)%60 : (topArtists[2]?.popularity)%60} PM</text>
                <div style={{fontSize: 11, position: 'relative', right: -240, top: -76, color: 'grey'}}><IoIosArrowForward/></div>
                <text style={{ lineHeight: '100%',fontSize: 11, position: 'relative', left: 60, top: -75, fontWeight: 400, fontFamily: 'Roboto', color: '#8c8c8c', marginRight: 50}}>
                {chooseText()}
                </text>
                <div className={styles.line} style={{top: 70}}></div>

              </div>

              <div className={styles.artist}>
              <img className={styles.artistimage} src={topArtists[3]?.image}/>
                <text style={{fontSize: 13, position: 'relative', left: 60, top: -42, fontWeight: 300, fontFamily: 'Roboto'}}>{topArtists[3]?.name}</text>
                <text style={{fontSize: 11, position: 'relative', right: -195, top: -62, fontWeight: 300, fontFamily: 'Roboto', color: '#8c8c8c'}}>4:{((topArtists[3]?.popularity)%60) < 10 ? '0' + (topArtists[3]?.popularity)%60 : (topArtists[3]?.popularity)%60} PM</text>
                <div style={{fontSize: 11, position: 'relative', right: -240, top: -76, color: 'grey'}}><IoIosArrowForward/></div>
                <text style={{ lineHeight: '100%',fontSize: 11, position: 'relative', left: 60, top: -75, fontWeight: 400, fontFamily: 'Roboto', color: '#8c8c8c', marginRight: 70}}>
                  {randomTexts[2]}
                </text>
                <div className={styles.line} style={{top: 130}}></div>

              </div>

              <div className={styles.artist}>
              <div className={styles.bluedot3} ></div>

              <img className={styles.artistimage} src={topArtists[4]?.image}/>
                <text style={{fontSize: 13, position: 'relative', left: 60, top: -42, fontWeight: 300, fontFamily: 'Roboto'}}>{topArtists[4]?.name}</text>
                <text style={{fontSize: 11, position: 'relative', right: -195, top: -62, fontWeight: 300, fontFamily: 'Roboto', color: '#8c8c8c'}}>1:{((topArtists[4]?.popularity)%60) < 10 ? '0' + (topArtists[4]?.popularity)%60 : (topArtists[4]?.popularity)%60} PM</text>
                <div style={{fontSize: 11, position: 'relative', right: -240, top: -76, color: 'grey'}}><IoIosArrowForward/></div>
                <text style={{    lineHeight: '100%',
fontSize: 11, position: 'relative', left: 60, top: -75, fontWeight: 400, fontFamily: 'Roboto', color: '#8c8c8c', marginRight: 70}}>
                {chooseText()}
                </text>
                <div className={styles.line} style={{top: 190}}></div>

              </div>

              <div className={styles.artist}>
              <img className={styles.artistimage} src={topArtists[5]?.image}/>
                <text style={{fontSize: 13, position: 'relative', left: 60, top: -42, fontWeight: 300, fontFamily: 'Roboto'}}>{topArtists[5]?.name}</text>
                <text style={{fontSize: 11, position: 'relative', right: -190, top: -62, fontWeight: 300, fontFamily: 'Roboto', color: '#8c8c8c'}}>11:{((topArtists[5]?.popularity)%60) < 10 ? '0' + (topArtists[5]?.popularity)%60 : (topArtists[5]?.popularity)%60} AM</text>
                <div style={{fontSize: 11, position: 'relative', right: -240, top: -76, color: 'grey'}}><IoIosArrowForward/></div>
                <text style={{ lineHeight: '100%',fontSize: 11, position: 'relative', left: 60, top: -75, fontWeight: 400, fontFamily: 'Roboto', color: '#8c8c8c', marginRight: 70}}>
                {chooseText()}
                </text>
                <div className={styles.line} style={{top: 250}}></div>

              </div>

              <div className={styles.artist}>
              <img className={styles.artistimage} src={topArtists[6]?.image}/>
                <text style={{fontSize: 13, position: 'relative', left: 60, top: -42, fontWeight: 300, fontFamily: 'Roboto'}}>{topArtists[6]?.name}</text>
                <text style={{fontSize: 11, position: 'relative', right: -195, top: -62, fontWeight: 300, fontFamily: 'Roboto', color: '#8c8c8c'}}>9:{((topArtists[6]?.popularity)%60) < 10 ? '0' + (topArtists[6]?.popularity)%60 : (topArtists[6]?.popularity)%60} AM</text>
                <div style={{fontSize: 11, position: 'relative', right: -240, top: -76, color: 'grey'}}><IoIosArrowForward/></div>
                <text style={{ lineHeight: '100%',fontSize: 11, position: 'relative', left: 60, top: -75, fontWeight: 400, fontFamily: 'Roboto', color: '#8c8c8c', marginRight: 70}}>
                {chooseText()}
                </text>
              </div>
          </div>
        </div>



          {/* {topArtists.map((x) => (
            <div key={x.name}>
              <h1>{(x.name)}</h1>
            </div>
          ))} */}

        </main>
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