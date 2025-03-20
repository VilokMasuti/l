
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import PricingTable from '../components/PricingTable';
import ContactForm from '../components/ContactForm';
import UserSearch from '../components/UserSearch';
import { Layers, Code, Smartphone, BarChart } from 'lucide-react';

const Index = () => {
  const services = [
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'UI/UX Design',
      description: 'Intuitive interfaces crafted with precision. We design experiences that delight users and achieve business goals.',
      imageSrc: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop'
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Web Development',
      description: 'From concept to deployment, we build responsive, scalable web applications using modern technologies.',
      imageSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications designed for performance and user engagement.',
      imageSrc: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop'
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: 'Performance Optimization',
      description: 'Boost your site\'s speed and efficiency with our performance-focused enhancements and optimizations.',
      imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop'
    }
  ];

  return (
    <Layout>
      <Hero />

      <section id="services" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-foreground/70">
              We offer comprehensive solutions to transform your digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
                imageSrc={service.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>

      <PricingTable />

      <UserSearch />

      <ContactForm />
    </Layout>
  );
};

export default Index;
