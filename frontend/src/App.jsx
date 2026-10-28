import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import SummaryMetrics from './components/SummaryMetrics';
import SentimentTrendChart from './components/SentimentTrendChart';
import SentimentDistributionBars from './components/SentimentDistributionBars';
import TopicRankedList from './components/TopicRankedList';
import FilterBar from './components/FilterBar';
import RecentPostsFeed from './components/RecentPostsFeed';
import Pagination from './components/Pagination';
import { MetricsSkeleton, PanelSkeleton, FeedSkeleton } from './components/LoadingState';
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
  // Navigation & Layout state
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data states
  const [health, setHealth] = useState(null);
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [topicSummary, setTopicSummary] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [totalFiltered, setTotalFiltered] = useState(0);

  // Status & Control states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isMock, setIsMock] = useState(getMockMode());
  const [isSimulatingError, setIsSimulatingError] = useState(getSimulateError());

  // Filter & Search states
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Load dashboard data
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
      setError(err.message || 'Failed to connect to SentiTrend streaming service.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derive available topics dynamically
  const dynamicTopics = useMemo(() => {
    const set = new Set();
    if (topicSummary?.topics) {
      topicSummary.topics.forEach((t) => {
        if (t.topic) set.add(t.topic.toLowerCase());
      });
    }
    allPosts.forEach((p) => {
      if (p.topic) set.add(p.topic.toLowerCase());
    });
    return Array.from(set).sort();
  }, [topicSummary, allPosts]);

  // Filter posts
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

      // Keyword search
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

  useEffect(() => {
    setTotalFiltered(filteredPosts.length);
  }, [filteredPosts]);

  // Filter Handlers
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

  // Dual-mode toggle
  const handleToggleMock = () => {
    const nextMock = !isMock;
    setIsMock(nextMock);
    setMockMode(nextMock);
    loadData();
  };

  // Evaluation error toggle
  const handleToggleSimulateError = () => {
    const nextErr = !isSimulatingError;
    setIsSimulatingError(nextErr);
    setSimulateError(nextErr);
    loadData();
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'feed':
        return 'Live Social Wire';
      case 'sentiment':
        return 'Sentiment Pulse';
      case 'topics':
        return 'Trending Channels';
      default:
        return 'Live Overview';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EEFF] text-[#24213A] flex font-sans antialiased relative overflow-x-hidden">
      {/* Decorative ambient background accents */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-radial from-[#D4C9FF]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-64 w-[400px] h-[400px] bg-radial from-[#12B8B0]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/4 w-[350px] h-[350px] bg-radial from-[#FF5C69]/08 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Left Deep Violet Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        health={health}
        isMock={isMock}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <TopBar
          activeTabTitle={getTabTitle()}
          isMock={isMock}
          onToggleMock={handleToggleMock}
          isSimulatingError={isSimulatingError}
          onToggleSimulateError={handleToggleSimulateError}
          onRefresh={loadData}
          loading={loading}
          lastUpdated={lastUpdated}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Error Banner */}
          {error && <ErrorState error={error} onRetry={loadData} />}

          {/* Greeting Banner */}
          {(activeTab === 'overview') && (
            <div className="pb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#5B3CC4] block">
                Social Stream Monitoring
              </span>
              <p className="text-sm font-semibold text-[#6F6A85] mt-0.5">
                Here's what's happening across the social stream in real time.
              </p>
            </div>
          )}

          {/* 1. Summary Metrics Band */}
          {(activeTab === 'overview' || activeTab === 'sentiment') && (
            <section aria-label="Summary KPIs">
              {loading && !summary ? <MetricsSkeleton /> : <SummaryMetrics summary={summary} />}
            </section>
          )}

          {/* 2. Visual Analytics Grid: Sentiment Pulse (Area/Line) + Distribution Bars */}
          {(activeTab === 'overview' || activeTab === 'sentiment') && (
            <section
              aria-label="Sentiment Time Series and Distribution"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-7">
                {loading && !trends ? (
                  <PanelSkeleton title="Measuring Sentiment Frequency Trajectory..." />
                ) : (
                  <SentimentTrendChart trendsData={trends} />
                )}
              </div>

              <div className="lg:col-span-5">
                {loading && !summary ? (
                  <PanelSkeleton title="Calculating Polarity Proportions..." />
                ) : (
                  <SentimentDistributionBars summary={summary} />
                )}
              </div>
            </section>
          )}

          {/* 3. Topics and Live Feed Row */}
          <section
            aria-label="Topics and Feed Breakdown"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Trending Topics (Left column in overview, full in topics tab) */}
            {(activeTab === 'overview' || activeTab === 'topics') && (
              <div className={activeTab === 'topics' ? 'lg:col-span-12' : 'lg:col-span-5'}>
                {loading && !topicSummary ? (
                  <PanelSkeleton title="Ranking Trending Channels..." />
                ) : (
                  <TopicRankedList
                    topicsData={topicSummary}
                    onSelectTopic={(t) => {
                      handleSelectTopic(t);
                      if (activeTab === 'topics') setActiveTab('feed');
                    }}
                  />
                )}
              </div>
            )}

            {/* Live Social Activity Feed + Filter Bar + Pagination */}
            {(activeTab === 'overview' || activeTab === 'feed') && (
              <div className={activeTab === 'feed' ? 'lg:col-span-12' : 'lg:col-span-7'}>
                <div className="space-y-3">
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
                    <FeedSkeleton />
                  ) : (
                    <>
                      <RecentPostsFeed
                        posts={paginatedPosts}
                        loading={loading}
                        totalFiltered={totalFiltered}
                      />

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
                </div>
              </div>
            )}
          </section>
        </main>

        {/* Minimal Footer */}
        <footer className="mt-auto border-t border-[#E3DCFC] bg-white/70 backdrop-blur-xs py-4 px-6 text-xs text-[#6F6A85]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="font-extrabold text-[#5B3CC4]">SentiTrend</span> &bull; Vibrant Social Pulse Intelligence
            </div>
            <div className="text-[11px] text-[#6F6A85] font-mono font-semibold">
              Pipeline: Bluesky &rarr; Kafka &rarr; Spark Streaming &rarr; VADER &rarr; HBase
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
