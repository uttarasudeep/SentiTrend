/**
 * SentiTrend API Service Layer
 * Abstracted interface supporting both Mock Data and Live Backend (api_server.py)
 */

import {
  mockHealth,
  mockPosts,
  mockSentimentSummary,
  mockSentimentTrends,
  mockTopicSummary,
} from '../data/mockData';

// Configurable base URL and mock toggle
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
let useMockData = import.meta.env.VITE_USE_MOCK !== 'false';
let simulateError = false; // For error-state UI demonstrations

/**
 * Toggle between Mock Mode and Live Backend at runtime
 */
export const setMockMode = (enabled) => {
  useMockData = enabled;
};

export const getMockMode = () => useMockData;

/**
 * Toggle simulated error state for UI resilience testing
 */
export const setSimulateError = (enabled) => {
  simulateError = enabled;
};

export const getSimulateError = () => simulateError;

/**
 * Helper to simulate network latency for mock calls
 */
const mockDelay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 1. Health Check
 * Corresponds to GET /health
 */
export async function getHealth() {
  if (simulateError) {
    await mockDelay(200);
    throw new Error('Simulated network error: SentiTrend API server unreachable');
  }

  if (useMockData) {
    await mockDelay(150);
    return { ...mockHealth };
  }

  try {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) throw new Error(`Health check failed with status ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to connect to SentiTrend backend: ${err.message}`);
  }
}

/**
 * 2. Sentiment Summary
 * Corresponds to GET /api/sentiment/summary
 */
export async function getSentimentSummary() {
  if (simulateError) {
    await mockDelay(200);
    throw new Error('Simulated network error: Could not retrieve sentiment summary');
  }

  if (useMockData) {
    await mockDelay(200);
    return { ...mockSentimentSummary };
  }

  const res = await fetch(`${BASE_URL}/api/sentiment/summary`);
  if (!res.ok) throw new Error(`Summary API error: status ${res.status}`);
  return await res.json();
}

/**
 * 3. Sentiment Trends
 * Corresponds to GET /api/sentiment/trends
 */
export async function getSentimentTrends() {
  if (simulateError) {
    await mockDelay(200);
    throw new Error('Simulated network error: Could not retrieve sentiment trends');
  }

  if (useMockData) {
    await mockDelay(250);
    return { ...mockSentimentTrends };
  }

  const res = await fetch(`${BASE_URL}/api/sentiment/trends`);
  if (!res.ok) throw new Error(`Trends API error: status ${res.status}`);
  return await res.json();
}

/**
 * 4. Topic Summary
 * Corresponds to GET /api/topics/summary
 */
export async function getTopicSummary() {
  if (simulateError) {
    await mockDelay(200);
    throw new Error('Simulated network error: Could not retrieve topic analytics');
  }

  if (useMockData) {
    await mockDelay(250);
    return { ...mockTopicSummary };
  }

  const res = await fetch(`${BASE_URL}/api/topics/summary`);
  if (!res.ok) throw new Error(`Topic summary API error: status ${res.status}`);
  return await res.json();
}

/**
 * 5. Recent Posts with Filtering & Pagination
 * Corresponds to GET /api/posts?limit={limit}&offset={offset}&sentiment={sentiment}&topic={topic}
 */
export async function getPosts({ limit = 10, offset = 0, sentiment = null, topic = null } = {}) {
  if (simulateError) {
    await mockDelay(200);
    throw new Error('Simulated network error: Could not fetch post stream');
  }

  if (useMockData) {
    await mockDelay(300);

    // Apply filtering matching api_server.py logic
    let filtered = [...mockPosts];

    if (sentiment && sentiment !== 'All') {
      filtered = filtered.filter(
        (p) => p.sentiment.toLowerCase() === sentiment.toLowerCase()
      );
    }

    if (topic && topic !== 'All') {
      filtered = filtered.filter(
        (p) => p.topic.toLowerCase() === topic.toLowerCase()
      );
    }

    const totalFiltered = filtered.length;
    const page = filtered.slice(offset, offset + limit);

    return {
      count: page.length,
      total_filtered: totalFiltered,
      limit,
      offset,
      posts: page,
    };
  }

  // Live Backend Call
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit);
  if (offset !== undefined) params.append('offset', offset);
  if (sentiment && sentiment !== 'All') params.append('sentiment', sentiment);
  if (topic && topic !== 'All') params.append('topic', topic);

  const url = `${BASE_URL}/api/posts?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Posts API error: status ${res.status}`);
  return await res.json();
}
