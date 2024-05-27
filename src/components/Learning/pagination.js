import React, { useState, useEffect, useCallback, useRef } from 'react';

const InfiniteScroll = () => {
  const [allData, setAllData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20; // Number of items to display initially and per scroll
  const observer = useRef();



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setAllData(data);
      setDisplayedData(data.slice(0, limit));
      setLoading(false);
    };

    fetchData();
  }, []);

  const loadMoreData = () => {
    const newIndex = displayedData.length + limit;
    if (newIndex >= allData.length) {
      setDisplayedData(allData);
      setHasMore(false);
    } else {
      setDisplayedData(prevData => [
        ...prevData,
        ...allData.slice(prevData.length, newIndex),
      ]);
    }
  };

  
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreData();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div>
      {displayedData.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      {loading && <p>Loading...</p>}
      {hasMore && (
        <div ref={lastElementRef} style={{ height: 20 }}></div>
      )}
    </div>
  );
};

export default InfiniteScroll;
