/**
 * Realistic Mock Data for SentiTrend Dashboard
 * Structured to strictly match responses from api_server.py:
 * - GET /health
 * - GET /api/posts
 * - GET /api/sentiment/summary
 * - GET /api/sentiment/trends
 * - GET /api/topics/summary
 */

export const mockHealth = {
  status: "ok",
  service: "SentiTrend API"
};

export const mockPosts = [
  {
    id: "post_bsky_001",
    uri: "at://did:plc:rag52kxm6/app.bsky.feed.post/3la7wepq",
    platform: "bluesky",
    topic: "ai",
    text: "The new generative AI reasoning models are mind-blowing! Solved my distributed systems bug in 20 seconds.",
    sentiment: "Positive",
    compound_score: 0.8316,
    created_utc: "2026-10-28T14:40:00Z",
    collected_utc: "2026-10-28T14:40:04Z"
  },
  {
    id: "post_bsky_002",
    uri: "at://did:plc:x91nb7vc3/app.bsky.feed.post/3la7wf78",
    platform: "bluesky",
    topic: "gaming",
    text: "Worst server launch ever. Disconnected 6 times in a single match, complete waste of $70.",
    sentiment: "Negative",
    compound_score: -0.7425,
    created_utc: "2026-10-28T14:38:12Z",
    collected_utc: "2026-10-28T14:38:15Z"
  },
  {
    id: "post_bsky_003",
    uri: "at://did:plc:mm8v21pk9/app.bsky.feed.post/3la7wg11",
    platform: "bluesky",
    topic: "technology",
    text: "Apple and Google scheduled their joint cross-platform protocol announcement for next Wednesday at 10 AM PST.",
    sentiment: "Neutral",
    compound_score: 0.0000,
    created_utc: "2026-10-28T14:35:50Z",
    collected_utc: "2026-10-28T14:35:53Z"
  },
  {
    id: "post_bsky_004",
    uri: "at://did:plc:89qnxz33p/app.bsky.feed.post/3la7wh99",
    platform: "bluesky",
    topic: "ai",
    text: "Another day, another hallucinated citation in an academic paper. People need to stop trusting raw LLM output blindly.",
    sentiment: "Negative",
    compound_score: -0.5859,
    created_utc: "2026-10-28T14:32:00Z",
    collected_utc: "2026-10-28T14:32:05Z"
  },
  {
    id: "post_bsky_005",
    uri: "at://did:plc:bb7101kxm/app.bsky.feed.post/3la7wi44",
    platform: "bluesky",
    topic: "gaming",
    text: "The art direction and musical score in Silksong are truly a masterclass. Absolutely enjoying every moment so far!",
    sentiment: "Positive",
    compound_score: 0.8718,
    created_utc: "2026-10-28T14:30:15Z",
    collected_utc: "2026-10-28T14:30:19Z"
  },
  {
    id: "post_bsky_006",
    uri: "at://did:plc:aa0921klm/app.bsky.feed.post/3la7wj33",
    platform: "bluesky",
    topic: "cloud",
    text: "Migrated our Kafka cluster to AWS EKS today. Transition was seamless with zero dropped stream partitions.",
    sentiment: "Positive",
    compound_score: 0.6597,
    created_utc: "2026-10-28T14:26:40Z",
    collected_utc: "2026-10-28T14:26:44Z"
  },
  {
    id: "post_bsky_007",
    uri: "at://did:plc:qq8811zxx/app.bsky.feed.post/3la7wk22",
    platform: "bluesky",
    topic: "technology",
    text: "New battery architecture claims 80% charge in under 6 minutes. Looking forward to independent third-party benchmarks.",
    sentiment: "Positive",
    compound_score: 0.4404,
    created_utc: "2026-10-28T14:22:10Z",
    collected_utc: "2026-10-28T14:22:15Z"
  },
  {
    id: "post_bsky_008",
    uri: "at://did:plc:ff3399yyt/app.bsky.feed.post/3la7wl10",
    platform: "bluesky",
    topic: "cloud",
    text: "Cloud egress bills jumped 40% without warning. Pricing tiers are confusing and feel almost predatory.",
    sentiment: "Negative",
    compound_score: -0.6124,
    created_utc: "2026-10-28T14:18:05Z",
    collected_utc: "2026-10-28T14:18:10Z"
  },
  {
    id: "post_bsky_009",
    uri: "at://did:plc:kk2211oox/app.bsky.feed.post/3la7wm88",
    platform: "bluesky",
    topic: "ai",
    text: "PySpark + Spark MLlib text classification pipeline is training now with 10k vocabulary size and TF-IDF features.",
    sentiment: "Neutral",
    compound_score: 0.0000,
    created_utc: "2026-10-28T14:15:30Z",
    collected_utc: "2026-10-28T14:15:34Z"
  },
  {
    id: "post_bsky_010",
    uri: "at://did:plc:rr4422bbv/app.bsky.feed.post/3la7wn77",
    platform: "bluesky",
    topic: "gaming",
    text: "The latest balancing patch nerfed every enjoyable character. Who asked for these changes?! Uninstalled.",
    sentiment: "Negative",
    compound_score: -0.6808,
    created_utc: "2026-10-28T14:10:20Z",
    collected_utc: "2026-10-28T14:10:25Z"
  },
  {
    id: "post_bsky_011",
    uri: "at://did:plc:tt5533ccd/app.bsky.feed.post/3la7wo66",
    platform: "bluesky",
    topic: "general",
    text: "Nice weather outside today, going for a quick walk before getting back to the stream analytics assignment.",
    sentiment: "Positive",
    compound_score: 0.5859,
    created_utc: "2026-10-28T14:05:00Z",
    collected_utc: "2026-10-28T14:05:05Z"
  },
  {
    id: "post_bsky_012",
    uri: "at://did:plc:vv6644eed/app.bsky.feed.post/3la7wp55",
    platform: "bluesky",
    topic: "technology",
    text: "Linux kernel 6.18 released with improved ARM64 page table management and faster memory allocation.",
    sentiment: "Positive",
    compound_score: 0.4767,
    created_utc: "2026-10-28T13:58:45Z",
    collected_utc: "2026-10-28T13:58:50Z"
  },
  {
    id: "post_bsky_013",
    uri: "at://did:plc:ww7755ffd/app.bsky.feed.post/3la7wq44",
    platform: "bluesky",
    topic: "ai",
    text: "I genuinely love how much repetitive coding boilerplate this local copilot eliminates. Huge productivity boost!",
    sentiment: "Positive",
    compound_score: 0.8519,
    created_utc: "2026-10-28T13:50:10Z",
    collected_utc: "2026-10-28T13:50:15Z"
  },
  {
    id: "post_bsky_014",
    uri: "at://did:plc:xx8866ggd/app.bsky.feed.post/3la7wr33",
    platform: "bluesky",
    topic: "cloud",
    text: "Configured HBase wide-column store with column families post, sentiment, and metadata. REST endpoints respond in 12ms.",
    sentiment: "Positive",
    compound_score: 0.4939,
    created_utc: "2026-10-28T13:42:00Z",
    collected_utc: "2026-10-28T13:42:05Z"
  },
  {
    id: "post_bsky_015",
    uri: "at://did:plc:yy9977hhd/app.bsky.feed.post/3la7ws22",
    platform: "bluesky",
    topic: "gaming",
    text: "Graphics look pretty good on low settings, but the frame drops during boss fights make parrying impossible.",
    sentiment: "Neutral",
    compound_score: 0.0258,
    created_utc: "2026-10-28T13:35:10Z",
    collected_utc: "2026-10-28T13:35:14Z"
  },
  {
    id: "post_bsky_016",
    uri: "at://did:plc:zz0088iid/app.bsky.feed.post/3la7wt11",
    platform: "bluesky",
    topic: "ai",
    text: "Scam calls with cloned voices are getting dangerously realistic. We urgently need hardware cryptographic provenance.",
    sentiment: "Negative",
    compound_score: -0.6369,
    created_utc: "2026-10-28T13:28:40Z",
    collected_utc: "2026-10-28T13:28:45Z"
  },
  {
    id: "post_bsky_017",
    uri: "at://did:plc:ab1199jjd/app.bsky.feed.post/3la7wu00",
    platform: "bluesky",
    topic: "technology",
    text: "Standard HDMI 2.2 spec ratified by consortium today. Backward compatible with existing cables up to 4K 120Hz.",
    sentiment: "Neutral",
    compound_score: 0.0000,
    created_utc: "2026-10-28T13:20:00Z",
    collected_utc: "2026-10-28T13:20:06Z"
  },
  {
    id: "post_bsky_018",
    uri: "at://did:plc:cd2200kkd/app.bsky.feed.post/3la7wv99",
    platform: "bluesky",
    topic: "general",
    text: "Coffee spilled on my keyboard right before our team presentation. Today is just not my day.",
    sentiment: "Negative",
    compound_score: -0.5574,
    created_utc: "2026-10-28T13:12:15Z",
    collected_utc: "2026-10-28T13:12:20Z"
  },
  {
    id: "post_bsky_019",
    uri: "at://did:plc:ef3311lld/app.bsky.feed.post/3la7ww88",
    platform: "bluesky",
    topic: "cloud",
    text: "Zero trust network security architecture is tricky to set up properly, but the fine-grained audit logs are wonderful.",
    sentiment: "Positive",
    compound_score: 0.6908,
    created_utc: "2026-10-28T13:05:00Z",
    collected_utc: "2026-10-28T13:05:04Z"
  },
  {
    id: "post_bsky_020",
    uri: "at://did:plc:gh4422mmd/app.bsky.feed.post/3la7wx77",
    platform: "bluesky",
    topic: "gaming",
    text: "Co-op mode is finally working after the maintenance downtime. Having a fantastic evening gaming with the squad!",
    sentiment: "Positive",
    compound_score: 0.8126,
    created_utc: "2026-10-28T12:55:20Z",
    collected_utc: "2026-10-28T12:55:25Z"
  },
  {
    id: "post_bsky_021",
    uri: "at://did:plc:ij5533nnd/app.bsky.feed.post/3la7wy66",
    platform: "bluesky",
    topic: "ai",
    text: "The open source weights release is huge for research reproducibility. Kudos to the lab for putting open science first.",
    sentiment: "Positive",
    compound_score: 0.7783,
    created_utc: "2026-10-28T12:45:00Z",
    collected_utc: "2026-10-28T12:45:05Z"
  },
  {
    id: "post_bsky_022",
    uri: "at://did:plc:kl6644ood/app.bsky.feed.post/3la7wz55",
    platform: "bluesky",
    topic: "technology",
    text: "Privacy policy update notice: your session telemetry will now be retained for 90 days instead of 30 days.",
    sentiment: "Neutral",
    compound_score: 0.0000,
    created_utc: "2026-10-28T12:35:10Z",
    collected_utc: "2026-10-28T12:35:15Z"
  },
  {
    id: "post_bsky_023",
    uri: "at://did:plc:mn7755ppd/app.bsky.feed.post/3la7x044",
    platform: "bluesky",
    topic: "gaming",
    text: "Microtransactions inside a single-player paid RPG is unacceptable greed. Stop ruining gaming.",
    sentiment: "Negative",
    compound_score: -0.7351,
    created_utc: "2026-10-28T12:20:00Z",
    collected_utc: "2026-10-28T12:20:05Z"
  },
  {
    id: "post_bsky_024",
    uri: "at://did:plc:op8866qqd/app.bsky.feed.post/3la7x133",
    platform: "bluesky",
    topic: "cloud",
    text: "Latency dropped from 180ms to 24ms after enabling regional edge caching on Cloudflare.",
    sentiment: "Positive",
    compound_score: 0.4404,
    created_utc: "2026-10-28T12:05:30Z",
    collected_utc: "2026-10-28T12:05:35Z"
  },
  {
    id: "post_bsky_025",
    uri: "at://did:plc:qr9977rrd/app.bsky.feed.post/3la7x222",
    platform: "bluesky",
    topic: "ai",
    text: "Can someone explain why the loss function spikes at epoch 14? Frustrating convergence issue on the custom transformer.",
    sentiment: "Negative",
    compound_score: -0.4767,
    created_utc: "2026-10-28T11:50:00Z",
    collected_utc: "2026-10-28T11:50:05Z"
  }
];

export const mockSentimentSummary = {
  total_posts: 25,
  positive: 13,
  negative: 7,
  neutral: 5,
  unknown: 0,
  average_compound_score: 0.2248
};

export const mockSentimentTrends = {
  count: 7,
  trends: [
    { date: "2026-10-22", positive: 18, negative: 8, neutral: 9 },
    { date: "2026-10-23", positive: 24, negative: 12, neutral: 14 },
    { date: "2026-10-24", positive: 31, negative: 15, neutral: 11 },
    { date: "2026-10-25", positive: 22, negative: 19, neutral: 8 },
    { date: "2026-10-26", positive: 38, negative: 14, neutral: 16 },
    { date: "2026-10-27", positive: 45, negative: 20, neutral: 15 },
    { date: "2026-10-28", positive: 52, negative: 23, neutral: 18 }
  ]
};

export const mockTopicSummary = {
  count: 5,
  topics: [
    {
      topic: "ai",
      total_posts: 68,
      positive: 38,
      negative: 21,
      neutral: 9,
      unknown: 0
    },
    {
      topic: "gaming",
      total_posts: 54,
      positive: 24,
      negative: 23,
      neutral: 7,
      unknown: 0
    },
    {
      topic: "cloud",
      total_posts: 36,
      positive: 22,
      negative: 10,
      neutral: 4,
      unknown: 0
    },
    {
      topic: "technology",
      total_posts: 42,
      positive: 25,
      negative: 7,
      neutral: 10,
      unknown: 0
    },
    {
      topic: "general",
      total_posts: 20,
      positive: 9,
      negative: 6,
      neutral: 5,
      unknown: 0
    }
  ]
};
