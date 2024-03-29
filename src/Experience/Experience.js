import React, { useState, useRef, useEffect } from "react";
import * as Styled from "./experience.styles";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import Header from "../SectionHeader/Header";
import data from "../data.json";
import { array } from "prop-types";
import VideocamIcon from '@mui/icons-material/Videocam';
import { color, fonts } from "../Global/Variables";

export default function Experience() {
  const [animateInView, setAnimateInView] = useState(false);
  const elementPosition = useRef(null);
  const [selectedJob, setSelectedJob] = useState();
  const videoRef = useRef(null);
  
  const [selectedVideo, setSelectedVideo] = useState(
    data.experience[0].videos[0]
  );
  const [showVideoModal, setShowVideoModal] = useState(false);


  const sectionInView = () => {
    window.addEventListener("scroll", () => {
      if (
        window.scrollY >
        elementPosition.current.offsetTop - elementPosition.current.clientHeight
      ) {
        setAnimateInView(true);
      }
    });
  };

  useEffect(() => {
    sectionInView();
    setSelectedJob(data.experience[0].company);
  }, []);

  // This code below will create a highlighted line which has a highlighted part, it is dynamic
  // so if another job is added then the highlighted line will be the right size for the number of job
  // ie 3 jobs the line will 33%, 4 the line will be 25% etc

  let index = data.experience.findIndex(
    (job) => job.company === `${selectedJob}`
  );
  const numberOfJobs = 100 / data.experience.length;
  let underlinePosition = (index * numberOfJobs).toFixed(1);

  const jobDetails = data.experience.filter(
    (job) => job.company === selectedJob
  );

  const updateVideo = (newVideoUrl) => {
    videoRef.current.src = `${newVideoUrl}`;
    videoRef.current.load();
    
  };

  const outerModalRef = useRef(null);

  const handleOuterModalClick = (event) => {
    if (event.target === outerModalRef.current) {
      setShowVideoModal(false);
    }
  };

  return (
    <Element name="experience" className="element">
      <Styled.fade inView={animateInView}>
        {showVideoModal && (  
        <Styled.videoModal  ref={outerModalRef} onClick={handleOuterModalClick}>
        <Styled.videoModalContainer>
          <Styled.videoSection>
          <Styled.role>{
            selectedVideo.title
            }</Styled.role>                 
                  <Styled.dates>{
                    selectedVideo.description}
                  </Styled.dates>
                  <video height="80%" width="100%" controls ref={videoRef}>
            <source
              src={`${selectedVideo.url}`}
              type="video/mp4"
            ></source>
          </video>
          </Styled.videoSection>
          <Styled.selectVideoButtons>
          {
            data.experience[0].videos.map((video, index) => {
              return (
                <Styled.videoButtonContainer  
                backgroundImage={video.image}
                onClick={() => {             
                  updateVideo(video.url)
                  setSelectedVideo(video)}}>
                  <VideocamIcon />
                </Styled.videoButtonContainer>
              )
            })
          }
          </Styled.selectVideoButtons>
        </Styled.videoModalContainer>
    
        </Styled.videoModal>
        )}
        <Styled.sectionContainer ref={elementPosition}>
          <Styled.experience>
            <Header title="Where I've worked" number="02." />
            <Styled.workContainer>
              <Styled.ul>
                {data.experience.map((job, index) => {
                  return (
                    <Styled.li
                      active={job.company === selectedJob}
                      key={index}
                      onClick={() => setSelectedJob(job.company)}
                    >
                      {job.company}
                    </Styled.li>
                  );
                })}
              </Styled.ul>
              <Styled.line position={underlinePosition}></Styled.line>

              {jobDetails.length && (
                <Styled.workDetails>
                  <Styled.role>{jobDetails[0].role}</Styled.role>
                  <Styled.company> @{jobDetails[0].company}</Styled.company>
                  <Styled.dates>{jobDetails[0].date}</Styled.dates>
                  <Styled.jobDetailsUl>
                    {jobDetails[0].detailsofRole.map((info) => (
                      <Styled.jobDetailsLi>{info}</Styled.jobDetailsLi>
                      
                    ))}
                    {jobDetails[0]?.videos && (
                      <Styled.jobDetailsLi>Please click 
                        <Styled.videoLink onClick={() => setShowVideoModal(true)}>
                         here 
                        </Styled.videoLink>
                         for video examples</Styled.jobDetailsLi>
                    )}
                  </Styled.jobDetailsUl>
                </Styled.workDetails>
              )}
                    
            </Styled.workContainer>
          </Styled.experience>
        </Styled.sectionContainer>
      </Styled.fade>
    </Element>
  );
}
