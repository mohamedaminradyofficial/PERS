'use client'

import { useState, useRef, DragEvent } from 'react'

interface MoodboardImage {
  id: string
  url: string
  file?: File
  position: number
  caption?: string
}

export default function MoodboardBuilder() {
  const [images, setImages] = useState<MoodboardImage[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [gridColumns, setGridColumns] = useState<number>(3)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: MoodboardImage[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      file,
      position: images.length + index,
      caption: ''
    }))

    setImages(prev => [...prev, ...newImages])
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, imageId: string) => {
    setDraggedItem(imageId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault()

    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = images.findIndex(img => img.id === draggedItem)
    const targetIndex = images.findIndex(img => img.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newImages = [...images]
    const [removed] = newImages.splice(draggedIndex, 1)
    newImages.splice(targetIndex, 0, removed)

    // Update positions
    const updatedImages = newImages.map((img, index) => ({
      ...img,
      position: index
    }))

    setImages(updatedImages)
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleRemoveImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const handleCaptionChange = (imageId: string, caption: string) => {
    setImages(prev => prev.map(img =>
      img.id === imageId ? { ...img, caption } : img
    ))
  }

  const handleDropZone = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (!files) return

    const newImages: MoodboardImage[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        file,
        position: images.length + index,
        caption: ''
      }))

    setImages(prev => [...prev, ...newImages])
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all images? / هل أنت متأكد من حذف جميع الصور؟')) {
      images.forEach(img => URL.revokeObjectURL(img.url))
      setImages([])
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Moodboard Builder</h2>
        <p className="text-slate-600" dir="rtl">منشئ لوحة المشاعر والمرئيات</p>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <div
          className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-slate-400 transition cursor-pointer bg-slate-50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropZone}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Drag & Drop Images Here
          </h3>
          <p className="text-slate-600" dir="rtl">
            اسحب وأفلت الصور هنا أو انقر للتحميل
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Supports: JPG, PNG, WebP, GIF
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Controls */}
      {images.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">
              Grid Columns / عدد الأعمدة:
            </label>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map(cols => (
                <button
                  key={cols}
                  onClick={() => setGridColumns(cols)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    gridColumns === cols
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cols}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              + Add More / إضافة المزيد
            </button>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Clear All / مسح الكل
            </button>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 ? (
        <div
          className="grid gap-4 mb-8"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`
          }}
        >
          {images.map(image => (
            <div
              key={image.id}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, image.id)}
              onDragEnd={handleDragEnd}
              className={`group relative bg-slate-100 rounded-lg overflow-hidden cursor-move transition-all ${
                draggedItem === image.id ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              } hover:shadow-xl`}
            >
              {/* Image */}
              <div className="aspect-square relative">
                <img
                  src={image.url}
                  alt={image.caption || `Moodboard image ${image.position + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveImage(image.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition transform scale-90 group-hover:scale-100"
                  >
                    Remove / حذف
                  </button>
                </div>

                {/* Drag Handle Indicator */}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition">
                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                  </svg>
                </div>
              </div>

              {/* Caption Input */}
              <div className="p-3 bg-white">
                <input
                  type="text"
                  value={image.caption}
                  onChange={(e) => handleCaptionChange(image.id, e.target.value)}
                  placeholder="Add caption... / إضافة وصف"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-lg">No images yet. Start by adding some images above.</p>
          <p dir="rtl" className="text-sm mt-2">لا توجد صور بعد. ابدأ بإضافة بعض الصور أعلاه</p>
        </div>
      )}

      {/* Action Buttons */}
      {images.length > 0 && (
        <div className="flex gap-4 pt-6 border-t">
          <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition">
            Save Moodboard / حفظ اللوحة
          </button>
          <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition">
            Export as PDF / تصدير PDF
          </button>
          <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition">
            Export as Image / تصدير كصورة
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips / نصائح</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Drag and drop images to reorder them / اسحب الصور لإعادة ترتيبها</li>
          <li>• Add captions to describe each visual element / أضف تعليقات لوصف كل عنصر مرئي</li>
          <li>• Adjust grid layout using the column buttons / اضبط تخطيط الشبكة باستخدام أزرار الأعمدة</li>
          <li>• Use high-quality images for best results / استخدم صوراً عالية الجودة لأفضل النتائج</li>
        </ul>
      </div>
    </div>
  )
}
