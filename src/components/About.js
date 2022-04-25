import React from 'react';
import { selectAllCities } from '../features/cities/citiesSlice';
import { useSelector } from 'react-redux';
import githubLogo from '../assets/github-logo.png';
import linkedinLogo from '../assets/linkedin-logo.png';
import reactLogo from '../assets/react-logo.png';
import pythonLogo from '../assets/python-logo.png';
import sassLogo from '../assets/sass-logo.png';
import reduxLogo from '../assets/redux-logo.png';
import djangoLogo from '../assets/django-logo.png';
import beautifulSoupLogo from '../assets/beautifulsoup-logo.jpeg';

const About = () => {
  const allCities = useSelector(selectAllCities);

  return (
    <section
      className='about'
      style={{
        backgroundImage: `url(${allCities[2]?.image})`
      }}
    >
      <div className='about__container'>
        <h1 className='about__title'>About</h1>
        <p className='about__about-text'>
          <span>
            Unsure of where to go on your next holiday? Curious to see how destinations fair in
            terms of food, weather or culture?
          </span>
          <br />
          <span className='about__emphasis'>
            Holistars is the social media hub for travellers just like you.
          </span>
          <span>
            Browse destinations, get their top attractions, read & leave reviews, follow other
            travellers, and create a timeline of your own holidays to help others discover fantastic
            places to visit!
          </span>
        </p>
        <div className='about__creators-container'>
          <h2 className='about__subtitle'>Brought to you by</h2>
          <div className='about__creators'>
            <div className='card about__creator about__creator--emily'>
              <div
                className='about__image'
                style={{
                  backgroundImage: `url(${'https://ca.slack-edge.com/T0351JZQ0-U02TR88BMU3-0c8ca24825dd-512'})`
                }}
              ></div>
              <div className='about__creator-text'>
                <p className='about__name'>Emily Daykin</p>
                <div className='about__links'>
                  <a target='_blank' href='https://github.com/emilydaykin' rel='noreferrer'>
                    <img src={githubLogo} alt='github logo' width='20px' />
                  </a>
                  <a
                    target='_blank'
                    href='https://www.linkedin.com/in/emily-daykin/'
                    rel='noreferrer'
                  >
                    <img src={linkedinLogo} alt='linkedin logo' width='20px' />
                  </a>
                </div>
                <p className='about__description'>
                  Hi! I'm Emily, a Data Scientist by training venturing deeper into Software
                  Engineering. I love beaches and ice cream.
                </p>
              </div>
            </div>
            <div className='card about__creator about__creator--marco'>
              <div
                className='about__image'
                style={{
                  backgroundImage: `url(${'https://ca.slack-edge.com/T0351JZQ0-U02847P7ME2-297de63247f9-512'})`
                }}
              ></div>
              <div className='about__creator-text'>
                <p className='about__name'>Marco Manunta</p>
                <div className='about__links'>
                  <a target='_blank' href='https://github.com/frozenborder72' rel='noreferrer'>
                    <img src={githubLogo} alt='github logo' width='20px' />
                  </a>
                  <a
                    target='_blank'
                    href='https://www.linkedin.com/in/marco-manunta/'
                    rel='noreferrer'
                  >
                    <img src={linkedinLogo} alt='linkedin logo' width='20px' />
                  </a>
                </div>
                <p className='about__description'>
                  Hi! I'm Marco Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reiciendis, vero.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='about__creators-container'>
          <h2 className='about__subtitle'>Powered By</h2>
          <div className='about__technologies'>
            <div className='card about__technologies-container'>
              <a target='_blank' href='https://sass-lang.com/' rel='noreferrer'>
                <img src={sassLogo} alt='Sass logo' />
              </a>
              <a target='_blank' href='https://reactjs.org/' rel='noreferrer'>
                <img src={reactLogo} alt='React logo' />
              </a>
              <a target='_blank' href='https://redux.js.org/' rel='noreferrer'>
                <img src={reduxLogo} alt='Redux logo' />
              </a>
              <a target='_blank' href='https://www.djangoproject.com/' rel='noreferrer'>
                <img src={djangoLogo} alt='Django logo' />
              </a>
              <a target='_blank' href='https://www.python.org/' rel='noreferrer'>
                <img src={pythonLogo} alt='Python logo' />
              </a>
              <a
                target='_blank'
                href='https://www.crummy.com/software/BeautifulSoup/bs4/doc/'
                rel='noreferrer'
              >
                <img src={beautifulSoupLogo} alt='Beautiful Soup logo' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
