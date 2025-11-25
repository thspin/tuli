import Link from 'next/link';
import { Wallet, FileText, Tag, TrendingUp, Shield, Zap } from 'lucide-react';
import { Heading, Text } from '@/src/components/ui/Typography';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <Heading level={1} className="mb-4">
            Gestiona tus finanzas con claridad
          </Heading>
          <Text variant="body" color="secondary" className="text-lg mb-8">
            Tuli es tu compañero financiero personal. Organiza tus cuentas, controla tus gastos
            y toma decisiones informadas sobre tu dinero.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/accounts">
              <Button size="lg" leftIcon={<Wallet className="w-5 h-5" />}>
                Ir a Mis Cuentas
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="secondary" size="lg">
                Gestionar Categorías
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated" padding="lg">
            <CardContent className="text-center">
              <div className="w-12 h-12 bg-[var(--color-income)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-[var(--color-income)]" />
              </div>
              <h3 className="text-title mb-2">Visualiza tus finanzas</h3>
              <Text variant="body-sm" color="secondary">
                Entiende a dónde va tu dinero con reportes claros y resúmenes mensuales.
              </Text>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg">
            <CardContent className="text-center">
              <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-title mb-2">Datos seguros</h3>
              <Text variant="body-sm" color="secondary">
                Tu información financiera está protegida y se mantiene privada en todo momento.
              </Text>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg">
            <CardContent className="text-center">
              <div className="w-12 h-12 bg-[var(--color-warning)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-[var(--color-warning)]" />
              </div>
              <h3 className="text-title mb-2">Rápido y simple</h3>
              <Text variant="body-sm" color="secondary">
                Registra transacciones en segundos. Menos tiempo gestionando, más tiempo viviendo.
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <Heading level={2} className="mb-6 text-center">
          Accesos rápidos
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/accounts" className="block group">
            <Card variant="interactive" padding="lg">
              <CardContent className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Mis Cuentas
                  </h3>
                  <Text variant="body-sm" color="muted">
                    Ver balances y transacciones
                  </Text>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/summaries" className="block group">
            <Card variant="interactive" padding="lg">
              <CardContent className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Resúmenes
                  </h3>
                  <Text variant="body-sm" color="muted">
                    Pagos de tarjetas y préstamos
                  </Text>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/categories" className="block group">
            <Card variant="interactive" padding="lg">
              <CardContent className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    Categorías
                  </h3>
                  <Text variant="body-sm" color="muted">
                    Organiza tus gastos
                  </Text>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
