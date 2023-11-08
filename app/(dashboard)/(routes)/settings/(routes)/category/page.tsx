import { Separator } from '@/components/ui/separator'
import CategoryForm from '../../_components/category-form'
import { db } from '@/lib/db'

const SettingsCategaryPage = async () => {
  const categories = await db.category.findMany({})

  return (
    <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">Category</h3>
      <p className="text-sm text-muted-foreground">
        This is how others will see you on the site.
      </p>
    </div>
    <Separator />
    <CategoryForm categories={categories} />
  </div>
  )
}

export default SettingsCategaryPage
