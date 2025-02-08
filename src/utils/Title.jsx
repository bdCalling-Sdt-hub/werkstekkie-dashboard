// eslint-disable-next-line react/prop-types
const SectionTitle = ({ title, subTitle }) => {
    return (
        <div className="">
            <h2 
                className="lg:text-2xl text-xl font-bold uppercase animate-fadeIn"
            >
                {title}
            </h2>
            <h3
                className="animate-fadeIn text-xs"
            >
                {subTitle}
            </h3>
        </div>
    );
};

export default SectionTitle;