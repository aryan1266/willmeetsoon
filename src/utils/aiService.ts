// src/utils/aiService.ts - Re-exported from pure offline plannerService
export { 
  getConnectionPlan,
  getSmartOfflinePlan, 
  generateConnectionPlan,
  generateAIRecommendations,
  generateCountryShippingAdvice 
} from './plannerService';

export type { 
  FlowchartStep, 
  GiftResult, 
  AIGiftResult, 
  ConnectionPlanResponse, 
  AIPlannerResponse 
} from './plannerService';
