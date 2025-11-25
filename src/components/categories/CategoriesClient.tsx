'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/src/actions/categories/category-actions';
import { Category, COMMON_CATEGORY_EMOJIS } from '@/src/types';
import { Heading, Text } from '@/src/components/ui/Typography';
import { Modal, Input, Button, Alert } from '@/src/components/ui';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { ListSkeleton } from '@/src/components/ui/Skeleton';
import { cn } from '@/src/lib/utils';

export default function CategoriesClient() {
  const [activeTab, setActiveTab] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '🏷️',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [activeTab]);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const result = await getCategories(activeTab);
      if (result.success) {
        setCategories(result.categories as Category[]);
      } else {
        setError(result.error || 'Error al cargar categorías');
      }
    } catch (err) {
      setError('Error al cargar categorías');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        icon: category.icon || '🏷️',
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        icon: '🏷️',
      });
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('icon', formData.icon);
    data.append('categoryType', activeTab);

    try {
      let result;
      if (editingCategory) {
        result = await updateCategory(editingCategory.id, data);
      } else {
        result = await createCategory(data);
      }

      if (result.success) {
        setIsModalOpen(false);
        loadCategories();
      } else {
        setError(result.error || 'Error al guardar categoría');
      }
    } catch (err) {
      setError('Error al guardar categoría');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      const result = await deleteCategory(id);
      if (result.success) {
        loadCategories();
      } else {
        alert(result.error || 'Error al eliminar categoría');
      }
    } catch (err) {
      alert('Error al eliminar categoría');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Heading level={1}>Gestión de Categorías</Heading>
            <Text variant="body-sm" color="secondary" className="mt-1">
              Organiza tus ingresos y gastos por categorías
            </Text>
          </div>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => handleOpenModal()}
          >
            Nueva Categoría
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] p-1 mb-6 inline-flex">
          <button
            onClick={() => setActiveTab('EXPENSE')}
            className={cn(
              'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2',
              activeTab === 'EXPENSE'
                ? 'bg-[var(--color-expense-light)] text-[var(--color-expense)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            )}
            aria-pressed={activeTab === 'EXPENSE'}
          >
            <TrendingDown className="w-4 h-4" />
            Egresos
          </button>
          <button
            onClick={() => setActiveTab('INCOME')}
            className={cn(
              'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2',
              activeTab === 'INCOME'
                ? 'bg-[var(--color-income-light)] text-[var(--color-income)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            )}
            aria-pressed={activeTab === 'INCOME'}
          >
            <TrendingUp className="w-4 h-4" />
            Ingresos
          </button>
        </div>

        {/* List */}
        <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden">
          {isLoading ? (
            <div className="p-4">
              <ListSkeleton count={5} />
            </div>
          ) : categories.length === 0 ? (
            <EmptyState
              icon={activeTab === 'INCOME' ? TrendingUp : TrendingDown}
              title={`Sin categorías de ${activeTab === 'INCOME' ? 'ingresos' : 'egresos'}`}
              description="Crea tu primera categoría para empezar a organizar tus transacciones"
              action={
                <Button
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => handleOpenModal()}
                >
                  Crear Categoría
                </Button>
              }
            />
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 flex items-center justify-between hover:bg-[var(--color-bg-tertiary)] transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">{category.icon || '🏷️'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--color-text-primary)] truncate">
                        {category.name}
                      </p>
                      {category.isSystem && (
                        <span className="inline-flex items-center gap-1 text-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] px-2 py-0.5 rounded-full mt-1">
                          Sistema
                        </span>
                      )}
                    </div>
                  </div>

                  {!category.isSystem && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors"
                        aria-label="Editar categoría"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-expense)] hover:bg-[var(--color-expense-light)] rounded-lg transition-colors"
                        aria-label="Eliminar categoría"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
        >
          {error && (
            <Alert variant="error" className="mb-4" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Supermercado, Transporte"
              required
            />

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Icono
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className={cn(
                    'w-16 h-16 p-3 border border-[var(--color-border)] rounded-lg text-center text-2xl',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent'
                  )}
                  maxLength={2}
                />
                <div className="flex-1 grid grid-cols-6 gap-2 p-3 bg-[var(--color-bg-tertiary)] rounded-lg max-h-48 overflow-y-auto">
                  {COMMON_CATEGORY_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: emoji })}
                      className="hover:bg-[var(--color-bg-secondary)] p-2 rounded text-xl transition-colors"
                      aria-label={`Seleccionar emoji ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" loading={isSaving} className="flex-1">
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
