import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 60 * 60 }); // 1h
export const metrics = {
  totalRequests: 0,        
  cacheHits: 0,
  cacheMisses: 0,
  externalApiCalls: 0     
};

export function makeCacheKey(type, city) {
  return `${type}:${city.toLowerCase()}`;
}
