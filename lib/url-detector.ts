import { AlgorithmType } from './types';

const ALGORITHM_URLS: Record<AlgorithmType, string[]> = {
  astar: ['tvAh0JZF2YE'],
  bfs: ['pcKY4hjDrxk'],
  dfs: ['pcKY4hjDrxk'],
  alphabeta: ['dEs_kbvu_0s'],
  nqueens: ['xFv_Hl4B83A'],
  prim: ['4ZlRH0eK-qQ'],
  kruskal: ['4ZlRH0eK-qQ'],
  knapsack01: ['nLmhmB6NzcM'],
  fractionalKnapsack: ['oTTzNMHM05I'],
  lcs: ['sSno9rV8Rhg'],
  obst: ['vLS-zRCHo-Y'],
  hamiltonianCycle: ['dQr4wZCiJJ4'],
  huffman: ['co4_ahEDCho'],
};

const EXACT_URLS: Record<string, AlgorithmType> = {
  'https://youtu.be/tvAh0JZF2YE?si=ssIPCX46nFLvpZ91': 'astar',
  'https://youtu.be/pcKY4hjDrxk?si=-L_yqmwMa6ZgXeVQ': 'bfs',
  'https://youtu.be/pcKY4hjDrxk?si=lvaqDwZRwH0qEhD_': 'dfs',
  'https://youtu.be/xFv_Hl4B83A?si=o9lU2DuPuiub61KT': 'nqueens',
  'https://youtu.be/dEs_kbvu_0s?si=u4lfdmc2lantQ8QU': 'alphabeta',
  'https://youtu.be/4ZlRH0eK-qQ?si=LNbZki14svpJx_35': 'prim',
  'https://youtu.be/4ZlRH0eK-qQ?si=ohX9ac90KpA9rWA_': 'kruskal',
  'https://youtu.be/nLmhmB6NzcM?si=3G3jHOwA6JVWWJwi': 'knapsack01',
  'https://youtu.be/oTTzNMHM05I?si=YX5Wm-qJsudtpZlT': 'fractionalKnapsack',
  'https://youtu.be/sSno9rV8Rhg?si=WJaCVwRN1EmWFhXC': 'lcs',
  'https://youtu.be/vLS-zRCHo-Y?si=rTcZk3x5ApATru0T': 'obst',
  'https://youtu.be/dQr4wZCiJJ4?si=3oG8K8eK_PuMjn1L': 'hamiltonianCycle',
  'https://youtu.be/co4_ahEDCho?si=Py6tK4oj1oEllkXF': 'huffman',
};

export function detectAlgorithmFromUrl(url: string): AlgorithmType | null {
  try {
    const trimmedUrl = url.trim();
    
    // 1. Check exact or partial URL match first (crucial for distinguishing BFS vs DFS on same video)
    for (const [exactUrl, algorithm] of Object.entries(EXACT_URLS)) {
      if (trimmedUrl === exactUrl || trimmedUrl.includes(exactUrl.split('?')[1])) {
        return algorithm;
      }
    }

    // 2. Extract video ID and fallback to general mapping
    const videoId = extractYoutubeVideoId(url);
    if (!videoId) return null;

    for (const [algorithm, ids] of Object.entries(ALGORITHM_URLS)) {
      if (ids.includes(videoId)) {
        return algorithm as AlgorithmType;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function extractYoutubeVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function isValidYoutubeUrl(url: string): boolean {
  return extractYoutubeVideoId(url) !== null;
}
