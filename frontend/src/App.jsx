import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import SentimentDistributionChart from './components/SentimentDistributionChart';
import SentimentTrendChart from './components/SentimentTrendChart';
import TopicAnalyticsChart from './components/TopicAnalyticsChart';
import FilterBar from './components/FilterBar';
import RecentPostsTable from './components/RecentPostsTable';
import Pagination from './components/Pagination';
import {
  SummaryCardsSkeleton,
  ChartSkeleton,
  TableSkeleton,
} from './components/LoadingState';
import ErrorState from './components/ErrorState';

import {
  getHealth,
  getSentimentSummary,
  getSentimentTrends,
  getTopicSummary,
  getPosts,
  setMockMode,
  getMockMode,
  setSimulateError,
  getSimulateError,
} from './services/api';

export default function App() {
  // Application Data States
  const [health, setHealth] = useState(null);
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [topicSummary, setTopicSummary] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [totalFiltered, setTotalFiltered] = useState(0);

  // UI Control States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isMock, setIsMock] = useState(getMockMode());
  const [isSimulatingError, setIsSimulatingError] = useState(getSimulateError());

  // Filter States
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Load Dashboard Data
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [healthRes, summaryRes, trendsRes, topicsRes, postsRes] =
        await Promise.all([
          getHealth(),
          getSentimentSummary(),
          getSentimentTrends(),
          getTopicSummary(),
          getPosts({ limit: 500, offset: 0 }),
        ]);

      setHealth(healthRes);
      setSummary(summaryRes);
      setTrends(trendsRes);
      setTopicSummary(topicsRes);
      setAllPosts(postsRes.posts || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('SentiTrend load error:', err);
      setError(err.message || 'Failed to load streaming analytics data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Dynamically derive unique topics list from topic summary and posts
  const dynamicTopics = useMemo(() => {
    const topicsSet = new Set();
    if (topicSummary?.topics) {
      topicSummary.topics.forEach((t) => {
        if (t.topic) topicsSet.add(t.topic.toLowerCase());
      });
    }
    allPosts.forEach((p) => {
      if (p.topic) topicsSet.add(p.topic.toLowerCase());
    });
    return Array.from(topicsSet).sort();
  }, [topicSummary, allPosts]);

  // Client-side filtering & search on the fetched dataset
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Sentiment filter
      if (
        selectedSentiment !== 'All' &&
        post.sentiment?.toLowerCase() !== selectedSentiment.toLowerCase()
      ) {
        return false;
      }

      // Topic filter
      if (
        selectedTopic !== 'All' &&
        post.topic?.toLowerCase() !== selectedTopic.toLowerCase()
      ) {
        return false;
      }

      // Text keyword search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesText = post.text?.toLowerCase().includes(query);
        const matchesTopic = post.topic?.toLowerCase().includes(query);
        return matchesText || matchesTopic;
      }

      return true;
    });
  }, [allPosts, selectedSentiment, selectedTopic, searchQuery]);

  // Paginated slice
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  // Keep totalFiltered updated
  useEffect(() => {
    setTotalFiltered(filteredPosts.length);
  }, [filteredPosts]);

  // Reset page to 1 when filters change
  const handleSelectSentiment = (sentiment) => {
    setSelectedSentiment(sentiment);
    setCurrentPage(1);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedSentiment('All');
    setSelectedTopic('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Toggle Mock vs Live
  const handleToggleMock = () => {
    const newMock = !isMock;
    setIsMock(newMock);
    setMockMode(newMock);
    loadData();
  };

  // Toggle Error simulation
  const handleToggleSimulateError = () => {
    const newErr = !isSimulatingError;
    setIsSimulatingError(newErr);
    setSimulateError(newErr);
    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <Header
        health={health}
        isMock={isMock}
        onToggleMock={handleToggleMock}
        isSimulatingError={isSimulatingError}
        onToggleSimulateError={handleToggleSimulateError}
        onRefresh={loadData}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Error Notification with Retry */}
        {error && <ErrorState error={error} onRetry={loadData} />}

        {/* 1. Summary Cards Section */}
        <section aria-label="Sentiment Summary KPI Cards">
          {loading && !summary ? (
            <SummaryCardsSkeleton />
          ) : (
            <SummaryCards summary={summary} />
          )}
        </section>

        {/* 2. Visual Analytics Section: Distribution + Trends */}
        <section
          aria-label="Visual Analytics Charts"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Sentiment Distribution (Donut Chart) */}
          <div className="lg:col-span-5">
            {loading && !summary ? (
              <ChartSkeleton title="Loading Distribution..." />
            ) : (
              <SentimentDistributionChart summary={summary} />
            )}
          </div>

          {/* Sentiment Trends Over Time (Area Chart) */}
          <div className="lg:col-span-7">
            {loading && !trends ? (
              <ChartSkeleton title="Loading Trends Curve..." />
            ) : (
              <SentimentTrendChart trendsData={trends} />
            )}
          </div>
        </section>

        {/* 3. Topic Analytics Section */}
        <section aria-label="Topic Analytics">
          {loading && !topicSummary ? (
            <ChartSkeleton title="Loading Topic Analytics..." />
          ) : (
            <TopicAnalyticsChart topicsData={topicSummary} />
          )}
        </section>

        {/* 4. Filterable & Paginated Posts Feed Table */}
        <section aria-label="Recent Social Posts Feed" className="space-y-4">
          <FilterBar
            selectedSentiment={selectedSentiment}
            onSelectSentiment={handleSelectSentiment}
            selectedTopic={selectedTopic}
            onSelectTopic={handleSelectTopic}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            topicsList={dynamicTopics}
            onResetFilters={handleResetFilters}
            totalFiltered={totalFiltered}
          />

          {loading && allPosts.length === 0 ? (
            <TableSkeleton />
          ) : (
            <>
              <RecentPostsTable posts={paginatedPosts} loading={loading} />
              {totalFiltered > 0 && (
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalItems={totalFiltered}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            SentiTrend &copy; 2026 &bull; Real-time Streaming Sentiment Analytics
          </p>
          <p className="text-slate-400">
            Powered by Bluesky Jetstream, Kafka, Spark Structured Streaming, VADER & HBase
          </p>
        </div>
      </footer>
    </div>
  );
}
