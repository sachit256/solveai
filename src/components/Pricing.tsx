import React from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Pricing = () => {
  const { handleSubscription, currentPlan, processingPayment } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      id: "free",
      price: "0",
      description: "Perfect for trying out SolveAI",
      features: [
        "2 questions per day",
        "Basic explanations",
        "Core subjects only",
        "Standard response time",
      ],
      button: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      id: "premium",
      price: "599",
      period: "month",
      description: "Most popular for students",
      features: [
        "Unlimited questions",
        "Detailed step-by-step solutions",
        "All subjects supported",
        "Priority response time",
        "Personalized learning paths",
        "Practice exercises",
        "Progress tracking",
        "24/7 AI support"
      ],
      button: "Subscribe",
      popular: true
    },
    {
      name: "Team",
      id: "team",
      price: "999",
      period: "month",
      description: "Perfect for study groups",
      features: [
        "Everything in Premium",
        "Up to 5 team members",
        "Shared workspaces",
        "Team analytics",
        "Collaborative learning",
        "Custom branding",
      ],
      button: "Coming Soon",
      popular: false
    }
  ];

  const featureComparison = [
    {
      category: "Basic Features",
      features: [
        {
          name: "Questions per day",
          free: "5",
          premium: "Unlimited",
          team: "Unlimited"
        },
        {
          name: "Response time",
          free: "Standard",
          premium: "Priority",
          team: "Priority"
        },
        {
          name: "Subjects covered",
          free: "Core subjects",
          premium: "All subjects",
          team: "All subjects"
        }
      ]
    },
    {
      category: "Advanced Features",
      features: [
        {
          name: "Step-by-step explanations",
          free: false,
          premium: true,
          team: true
        },
        {
          name: "Practice exercises",
          free: false,
          premium: true,
          team: true
        },
        {
          name: "Progress tracking",
          free: false,
          premium: true,
          team: true
        }
      ]
    },
    {
      category: "Team Features",
      features: [
        {
          name: "Shared workspaces",
          free: false,
          premium: false,
          team: true
        },
        {
          name: "Team analytics",
          free: false,
          premium: false,
          team: true
        },
        {
          name: "Custom branding",
          free: false,
          premium: false,
          team: true
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Pricing Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg ${
                  plan.popular ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /mo
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-primary-600 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (!user) {
                      navigate('/signin');
                      return;
                    }
                    if (plan.id === 'premium') {
                      handleSubscription(plan.id, 59900);
                    } else if (plan.id === 'team') {
                      handleSubscription(plan.id, 99900);
                    }
                  }}
                  disabled={currentPlan === plan.id || processingPayment}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    currentPlan === plan.id
                      ? 'bg-green-600 text-white cursor-default' 
                      : plan.popular
                        ? `bg-primary-600 hover:bg-primary-700 text-white ${processingPayment ? 'opacity-75 cursor-wait' : ''}`
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {currentPlan === plan.id ? (
                      'Current Plan'
                    ) : processingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.button
                    )}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Compare Features</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed comparison of all features across plans
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-6 w-1/4">Features</th>
                    <th className="text-center py-4 px-6">Free</th>
                    <th className="text-center py-4 px-6">Premium</th>
                    <th className="text-center py-4 px-6">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((category, i) => (
                    <React.Fragment key={i}>
                      <tr className="bg-gray-50 dark:bg-gray-900">
                        <td colSpan={4} className="py-4 px-6 font-semibold">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, j) => (
                        <tr key={j} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-4 px-6">{feature.name}</td>
                          <td className="text-center py-4 px-6">
                            {typeof feature.free === 'boolean' ? (
                              feature.free ? (
                                <Check className="w-5 h-5 text-primary-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              feature.free
                            )}
                          </td>
                          <td className="text-center py-4 px-6">
                            {typeof feature.premium === 'boolean' ? (
                              feature.premium ? (
                                <Check className="w-5 h-5 text-primary-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              feature.premium
                            )}
                          </td>
                          <td className="text-center py-4 px-6">
                            {typeof feature.team === 'boolean' ? (
                              feature.team ? (
                                <Check className="w-5 h-5 text-primary-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              feature.team
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 