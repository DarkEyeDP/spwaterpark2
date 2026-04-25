import { Link } from 'react-router';
import { Anchor, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-ocean-navy to-aqua-water text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-gold-treasure rounded-full flex items-center justify-center mx-auto mb-6">
          <Anchor className="w-12 h-12 text-ocean-navy" />
        </div>

        <h1 className="font-heading text-6xl md:text-8xl mb-4">404</h1>
        <h2 className="font-heading text-3xl md:text-4xl mb-4">Lost at Sea</h2>
        <p className="text-xl text-white/90 mb-8 max-w-md mx-auto">
          The page you are looking for seems to have drifted away. Let's navigate you back to safer waters.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-coral-red text-white rounded-lg hover:bg-gold-treasure hover:text-ocean-navy transition-colors"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
