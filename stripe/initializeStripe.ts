import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe("pk_test_51JMB3JBPmPRkJ4wLllcv6N1XwwPH3Up0CkqszSeoISv7Li7b3IGSAqR62qWEEzBJUDuNCAPFQ7tBUZDN7RcxM5Sd00YtK5bizD");
  }
  return stripePromise;
};

export default initializeStripe;
