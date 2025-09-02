import { Star, Shield, Zap, Users } from "lucide-react";

export function TrustSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Sales Director",
      company: "TechFlow Inc.",
      content:
        "SyncSales transformed our lead management. We're closing 40% more deals with the same team size.",
      rating: 5,
      avatar: "/api/placeholder/40/40",
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Sales",
      company: "GrowthCorp",
      content:
        "The automation features saved us 15 hours per week. ROI was immediate and impressive.",
      rating: 5,
      avatar: "/api/placeholder/40/40",
    },
    {
      name: "Jennifer Park",
      role: "Marketing Manager",
      company: "ScaleUp Solutions",
      content:
        "Finally, a platform that actually understands how sales teams work. Game changer for our pipeline.",
      rating: 5,
      avatar: "/api/placeholder/40/40",
    },
  ];

  const trustBadges = [
    {
      icon: Shield,
      text: "SOC 2 Compliant",
      description: "Enterprise-grade security",
    },
    { icon: Zap, text: "99.9% Uptime", description: "Reliable performance" },
    // {
    //   icon: Users,
    //   text: "10,000+ Users",
    //   description: "Trusted by sales teams",
    // },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-900 to-neutral-800">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Sales Teams Worldwide
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-amber-400 rounded-full flex items-center justify-center">
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1">{badge.text}</h3>
                <p className="text-gray-400 text-sm">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-amber-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos Section */}
        {/* <div className="text-center">
          <p className="text-gray-400 mb-8">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="w-24 h-12 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">TechFlow</span>
            </div>
            <div className="w-24 h-12 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                GrowthCorp
              </span>
            </div>
            <div className="w-24 h-12 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">ScaleUp</span>
            </div>
            <div className="w-24 h-12 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                InnovateLab
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
