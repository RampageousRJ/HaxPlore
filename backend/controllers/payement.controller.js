import Stripe from 'stripe';

export const newOrder=async(req,res)=>{

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
    
      res.json({session});    
}

export const confirmBooking=(req,res)=>{
    res.json({success:true})
}

export const refundMoney=(req,res)=>{
    res.json({success:true})
}
