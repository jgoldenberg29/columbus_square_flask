


export default function ImageCard({image}) {
    console.log(image)
    return (
        <div className='rounded overflow-hidden'>
            <img
                src={image}
                className='cursor-pointer object-cover min-h-full rounded transition-transform transform-gpu hover:scale-110'
                onClick={() => {}}
            />
        </div>
    )
}
