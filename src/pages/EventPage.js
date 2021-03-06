import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/index';
import DateFormat from '../components/Date/DateFormat';
import TimeFormat from '../components/Date/TimeFormat';
import { FiInfo, FiCalendar, FiLink2, FiDisc } from 'react-icons/fi';
import { ImPriceTag } from 'react-icons/im';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useHistory } from "react-router-dom";
import AuthApi from '../store/AuthApi';

const EventPage = () => {
    const { eventId: id } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [saved, setSaved] = useState(false);
    let history = useHistory();
    const { savedEvents, addToSavedEvents } = useContext(AuthApi);

    useEffect(() => {
        const getEventData = async (eventId) => {
            try {
                const { data } = await getEventById(eventId);
                setEventDetails(data);
            } catch (error) {
                console.error(error.response)
            }
        }
        const isEventInSaved = (id) => {
            if (savedEvents) {
                for (const obj of savedEvents) {
                    if (parseInt(obj.event_id) === parseInt(id)) {
                        setSaved(true);
                        return
                    }
                }
            }
            return false
        }
        getEventData(id)
        isEventInSaved(id)
    }, [])

    const handleClick = () => {
        history.goBack()
    }

    return (
        <>
            <section className="text-white mt-3 d-flex flex-column">
                <IoChevronBackOutline className="d-block back-button mx-auto" role="button" onClick={() => handleClick()} style={{ transform: 'scale(2)' }} />
                <article className="text-center my-3 p-3 shadow bg-less-dark row d-flex mx-auto" style={{ maxWidth: '80%', height: 'fit-content' }}>
                    {eventDetails && eventDetails?.eventName ?
                        (<>
                            <img src={eventDetails.image || "/image-placeholder.png"} alt={`${eventDetails.eventName}`} className="col-12 col-md-6 img-fluid" width="400" style={{ objectFit: 'cover' }} />
                            <section className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-start">
                                <h3 className="text-capitalize my-2">{eventDetails.eventName}</h3>
                                <section className="event-info text-start my-3">
                                    <h6 className="text-muted"><FiInfo /> Information</h6>
                                    <p>{eventDetails.description}</p>
                                </section>
                                <section className="event-time text-start my-3">
                                    <h6 className="text-muted"><FiCalendar /> Date & Time </h6>
                                    <DateFormat long={true} dateString={eventDetails.dateStart} className="fw-bolder" />{'   |   '}<TimeFormat dateString={eventDetails.dateStart} />
                                </section>
                                <section className="event-location text-start my-3">
                                    <h6 className="text-muted"><FiDisc /> Location</h6>
                                    {eventDetails.venueName ? <em>{eventDetails.venueName}</em> : null}
                                    <p>{`${eventDetails.address ? `${eventDetails.address}, ` : ''}${eventDetails.city}`}<br />{`${eventDetails.country}`}</p>
                                </section>
                                <section className="event-price text-start my-3">
                                    <h6 className="text-muted"><ImPriceTag /> Price</h6>
                                    <p>{eventDetails.price ? `${eventDetails.price} $` : 'Free'}</p>
                                </section>
                                {eventDetails.link && (<section className="event-link text-start my-3">
                                    <h6 className="text-muted"><FiLink2 /> Link</h6>
                                    <p><a href={eventDetails.link}>{eventDetails.link}</a></p>
                                </section>)}
                                <section className="event-actions d-grid w-100">
                                    {saved ?
                                        (<button className="btn btn-success" type="button" disabled>
                                            Joined
                                        </button>) :
                                        (<button className="btn btn-outline-success" type="button" onClick={() => { setSaved(true); addToSavedEvents(id) }}>
                                            Save
                                        </button>)}

                                </section>
                            </section>
                        </>)
                        : (<div className="spinner-border text-light mt-5 col-12 col-md-6 mx-auto" style={{ width: '4rem', height: '4rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>)}
                </article>
            </section>
            )
        </>
    )
}

export default EventPage

// city: "Los Angeles"
// country: "United States"
// address: "42 Nichols Avenue"
// dateEnd: "2020-06-06T18:50:00.000Z"
// dateStart: "2020-06-06T18:00:00.000Z"
// description: "Tearful performance"
// eventName: "Maybe Daddy Go Back"
// image: "/image-placeholder.png"
// isPublic: 1
// price: 80
// venueDesc: "Taverna e Caverna"
// venueId: 3
// venueName: "Papadopole"