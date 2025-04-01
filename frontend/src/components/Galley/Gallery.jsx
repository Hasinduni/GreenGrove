import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaLeaf, FaTractor, FaSeedling, FaWater } from 'react-icons/fa';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Farming gallery data
  const galleryData = [
    {
      id: 1,
      title: 'Organic Vegetable Farm',
      category: 'vegetables',
      imageUrl: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4',
      description: 'Our thriving organic vegetable garden with seasonal produce'
    },
    {
      id: 2,
      title: 'Modern Irrigation System',
      category: 'technology',
      imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a',
      description: 'Water-efficient irrigation technology for sustainable farming'
    },
    {
      id: 3,
      title: 'Harvesting Wheat',
      category: 'grains',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
      description: 'Golden wheat fields ready for harvest'
    },
    {
      id: 4,
      title: 'Farm Workers',
      category: 'people',
      imageUrl: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8',
      description: 'Our dedicated team working in the fields'
    },
    {
      id: 5,
      title: 'Fresh Produce',
      category: 'vegetables',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
      description: 'Freshly picked vegetables from our farm'
    },
    {
      id: 6,
      title: 'Farm Equipment',
      category: 'technology',
      imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce',
      description: 'Modern farming equipment for efficient operations'
    },
  ];

  // Filter images based on active category
  const filteredImages = activeCategory === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeCategory);

  // Handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Navigate through images in modal
  const navigateImage = (direction) => {
    const currentIndex = galleryData.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? galleryData.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryData.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(galleryData[newIndex]);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-2">
          <FaLeaf className="inline mr-2" />
          Our Farming Gallery
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the beauty and hard work behind our sustainable farming practices
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full flex items-center ${activeCategory === 'all' ? 'bg-green-600 text-white' : 'bg-white text-green-800 border border-green-200'}`}
          >
            <FaSeedling className="mr-2" /> All
          </button>
          <button
            onClick={() => setActiveCategory('vegetables')}
            className={`px-4 py-2 rounded-full flex items-center ${activeCategory === 'vegetables' ? 'bg-green-600 text-white' : 'bg-white text-green-800 border border-green-200'}`}
          >
            <FaLeaf className="mr-2" /> Vegetables
          </button>
          <button
            onClick={() => setActiveCategory('grains')}
            className={`px-4 py-2 rounded-full flex items-center ${activeCategory === 'grains' ? 'bg-green-600 text-white' : 'bg-white text-green-800 border border-green-200'}`}
          >
            🌾 Grains
          </button>
          <button
            onClick={() => setActiveCategory('technology')}
            className={`px-4 py-2 rounded-full flex items-center ${activeCategory === 'technology' ? 'bg-green-600 text-white' : 'bg-white text-green-800 border border-green-200'}`}
          >
            <FaTractor className="mr-2" /> Technology
          </button>
          <button
            onClick={() => setActiveCategory('people')}
            className={`px-4 py-2 rounded-full flex items-center ${activeCategory === 'people' ? 'bg-green-600 text-white' : 'bg-white text-green-800 border border-green-200'}`}
          >
            👨‍🌾 People
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleImageClick(item)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-green-800">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70"
              >
                ✕
              </button>
              
              <div className="relative h-[70vh]">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-contain"
                />
                
                <button 
                  onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                  <FiChevronLeft size={24} />
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-green-800">{selectedImage.title}</h3>
                <p className="text-gray-600 mt-2">{selectedImage.description}</p>
                <div className="mt-4 flex items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;