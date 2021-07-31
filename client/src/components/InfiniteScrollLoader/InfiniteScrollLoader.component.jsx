import React, {useState} from 'react';
import Message from '../../components/Message/Message.component';

const InfiniteScrollLoader = ({ pageNumber, pages, loading }) => {

      // Initial loader state
    const [initialLoader, setInitialLoader] = useState(true)
    if (loading !== true) {
        setTimeout(() => setInitialLoader(false), 1000)
    }

    return (
        <div>
            {(pageNumber > pages) ? (
                <Message>Oh no, it looks like you made it to the end...</Message>
            ) : (initialLoader || loading) ? (
                <Message>Loading...</Message>
            ) : (
                <Message>Simply scroll down to view more!</Message>
            )}
        </div>
    )
}

export default InfiniteScrollLoader;