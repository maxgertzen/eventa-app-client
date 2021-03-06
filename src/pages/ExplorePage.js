import React, { useEffect, useState, useContext } from 'react';
import { getEvents } from '../api';
import SearchBox from '../components/SearchBox/SearchBox';
import SearchResults from '../components/SearchResults/SearchResults';
import { useQuery } from '../hooks/useQuery';
// import AuthApi from '../store/AuthApi';

const ExplorePage = () => {
    const [events, setEvents] = useState([])
    const [searchResults, setSearchResults] = useState([])
    let query = useQuery();

    useEffect(() => {
        const callApi = async () => {
            let { data } = await getEvents();
            setEvents(data.events);
            let filtered;
            if (query.get('category')) {
                let searchTerm = query.get('category')
                filtered = data.events.filter((singleEvent) => singleEvent.categoryName.toLowerCase().split(' ').join('').includes(searchTerm))
            } else {
                filtered = data.events;
            }
            setSearchResults(filtered);
        }
        callApi();
    }, [])

    const submitSearch = async (e) => {
        e.preventDefault();
        let searchTerm = e.target[0].value.toLowerCase();
        const data = events.filter((singleEvent) => singleEvent.eventName.toLowerCase().includes(searchTerm) || singleEvent.description.toLowerCase().includes(searchTerm))
        setSearchResults(data);
    }

    const handleChange = async (e) => {
        let searchTerm = e.target.value.toLowerCase();
        let data = events.filter((singleEvent) => singleEvent.eventName.toLowerCase().includes(searchTerm) || singleEvent.description.toLowerCase().includes(searchTerm))
        if (!searchTerm.length) {
            data = events;
        }
        setSearchResults(data);
    }

    const filterByCategory = (searchTerm) => {
        let data;
        searchTerm = searchTerm.toLowerCase().split(' ').join('')
        query.set('category', searchTerm)
        if (searchTerm !== 'all') {
            data = events.filter(singleEvent => singleEvent.categoryName.toLowerCase().split(' ').join('').includes(searchTerm));
        } else {
            data = events;
        }
        setSearchResults(data);
    }

    return (
        <section className="explore h-100 container-fluid px-3 mt-3">
            <SearchBox handleSearch={submitSearch} handleOnChange={handleChange} filter={filterByCategory} />
            <SearchResults results={searchResults} />
        </section>
    )
}

export default ExplorePage