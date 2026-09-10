import { Product, Order, AIInsight, NearbyDemandOpportunity } from '../types';

export class AIService {
  /**
   * Predicts demand surge/trend based on historical order frequency & product attributes
   */
  public static forecastDemand(products: Product[], orders: Order[]): AIInsight[] {
    const insights: AIInsight[] = [];

    // Aggregate demand by product
    const cropOrderCounts: Record<string, { totalQty: number; totalOrders: number }> = {};
    orders.forEach(ord => {
      ord.items.forEach(item => {
        if (!cropOrderCounts[item.productName]) {
          cropOrderCounts[item.productName] = { totalQty: 0, totalOrders: 0 };
        }
        cropOrderCounts[item.productName].totalQty += item.quantity;
        cropOrderCounts[item.productName].totalOrders += 1;
      });
    });

    products.forEach(p => {
      const stats = cropOrderCounts[p.name] || { totalQty: 0, totalOrders: 0 };
      const baseSurge = 15 + (stats.totalOrders * 8) + (p.organic ? 10 : 0);
      const confidence = Math.min(96, 75 + stats.totalOrders * 5);

      insights.push({
        id: `ai_fc_${p.id}`,
        cropName: p.name,
        type: 'demand_surge',
        title: `Predicted Demand Surge for ${p.name}`,
        description: `Market order velocity indicates an estimated +${baseSurge}% demand surge over the coming 14 days in regional hubs.`,
        predictedDemandChangePct: baseSurge,
        suggestedPrice: Math.round(p.price * 1.1),
        confidence,
        recommendedAction: `Consider adjusting supply listing to ${Math.round(p.quantity * 1.2)} ${p.unit} and price to ₹${Math.round(p.price * 1.08)}/${p.unit} to optimize revenue.`,
        urgency: baseSurge > 30 ? 'high' : 'medium'
      });
    });

    return insights;
  }

  /**
   * Generates smart price recommendations for farmers based on supply/demand balance
   */
  public static getRecommendedPrice(product: Product, nearbyOpportunities: NearbyDemandOpportunity[]): {
    recommendedPrice: number;
    explanation: string;
    minPrice: number;
    maxPrice: number;
  } {
    const opp = nearbyOpportunities.find(o => o.cropName.toLowerCase().includes(product.name.toLowerCase()));
    let multiplier = 1.05;

    if (opp && opp.opportunityQty > 100) {
      multiplier = 1.12; // high deficit gap
    }

    const recommendedPrice = Math.round(product.price * multiplier);
    const minPrice = Math.round(product.price * 0.95);
    const maxPrice = Math.round(product.price * 1.25);

    return {
      recommendedPrice,
      explanation: `Based on regional demand deficit (+${opp ? opp.opportunityQty : 150}kg gap) and ${product.qualityGrade} quality grade rating.`,
      minPrice,
      maxPrice
    };
  }

  /**
   * Checks for potential crop spoilage or wastage risk
   */
  public static analyzeWastageRisk(product: Product): { isHighRisk: boolean; daysRemaining: number; recommendation: string } {
    const harvestDate = new Date(product.harvestDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - harvestDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Perishable items harvest lifespan estimation (~10 days for veg/fruits)
    const shelfLife = product.category === 'Vegetables' || product.category === 'Fruits' ? 10 : 90;
    const daysRemaining = Math.max(0, shelfLife - diffDays);
    const isHighRisk = daysRemaining <= 3 && product.quantity > 50;

    return {
      isHighRisk,
      daysRemaining,
      recommendation: isHighRisk
        ? `High spoilage risk! Only ${daysRemaining} days of peak freshness left. Apply 10% discount for orders >10kg to clear stock rapidly.`
        : `Produce freshness optimal. Estimated peak quality remaining: ${daysRemaining} days.`
    };
  }
}
