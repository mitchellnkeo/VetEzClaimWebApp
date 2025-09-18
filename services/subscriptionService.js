import { Purchases } from "@revenuecat/purchases-js";

const REVENUECAT_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY_TEST;
const PREMIUM_ENTITLEMENT = "premium_subscription";

class RevenueCatManager {
  static instance = null;

  constructor() {
    if (RevenueCatManager.instance) {   // Singleton pattern
      return RevenueCatManager.instance;
    }

    this.purchases = null;       // Web SDK instance
    this.customerInfo = null;
    this.customerId = null;

    RevenueCatManager.instance = this;
  }

  static getInstance() {
    if (!RevenueCatManager.instance) {
      RevenueCatManager.instance = new RevenueCatManager();
    }
    return RevenueCatManager.instance;
  }

  // Initialize RevenueCat
  async initialize(userId = null) {
    try {
      console.log("Initializing RevenueCat with userId:", userId);
      console.log("REVENUECAT_API_KEY:", REVENUECAT_API_KEY);

      this.purchases = Purchases.configure({
        apiKey: REVENUECAT_API_KEY,
        appUserId: userId || undefined,
      });

      this.customerId = userId || null;

      // Fetch initial customer info
      this.customerInfo = await this.purchases.getCustomerInfo();
      console.log("RevenueCat customerInfo fetched:", this.customerInfo);

      return this.customerInfo;
    } catch (err) {
      console.error("RevenueCat initialization error:", err);
      throw err;
    }
  }

  // Get current subscription status
  getCurrentStatus() {
    return {
      isPremium: Boolean(
        this.customerInfo?.entitlements?.active?.[PREMIUM_ENTITLEMENT]?.isActive
      ),
      customerId: this.customerId,
      customerInfo: this.customerInfo,
    };
  }

  // Logout RevenueCat
  async logout() {
    console.log("RevenueCat logout");
    try {
      if (this.customerId) {
        console.log("RevenueCat logOut called with customerId:", this.customerId);
        await this.purchases.logOut();
      }
      this.customerId = null;
      this.customerInfo = null;
      console.log("RevenueCat logout successful");
    } catch (err) {
      console.error("RevenueCat logout error:", err);
      throw err;
    }
  }

  // Fetch available subscription packages
  async getAvailablePackages() {
    try {
      const offerings = await this.purchases.getOfferings();
      const defaultOffering = offerings?.current;
      if (!defaultOffering) {
        console.error("No default offering found");
        return [];
      }
      return defaultOffering.availablePackages || [];
    } catch (err) {
      console.error("Error fetching packages:", err);
      return [];
    }
  }

  // Handle subscribe button click
  async handleSubscribe() {
    try {
      const packages = await this.getAvailablePackages();
  
      if (!packages || packages.length === 0) {
        throw new Error("No available packages found");
      }
  
      // Pick the first package if there are one or more
      const selectedPackage = packages[0];
  
      // Start purchase flow (Stripe checkout URL returned)
      const { customerInfo, checkoutUrl } = await this.purchases.purchasePackage(
        selectedPackage
      );
  
      this.customerInfo = customerInfo;
      return checkoutUrl;
    } catch (err) {
      console.error("Error initiating purchase:", err);
      throw err;
    }
  }
}

// Export singleton instance
export const revenueCatManager = RevenueCatManager.getInstance();
