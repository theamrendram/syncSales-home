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
    <section className="border-y border-border bg-muted py-20 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Trusted by Sales Teams Worldwide
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-10">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="gradient-primary mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full">
                  <badge.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {badge.text}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center">
                <div className="flex text-amber-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center">
                <div className="gradient-primary mr-3 h-10 w-10 rounded-full"></div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
