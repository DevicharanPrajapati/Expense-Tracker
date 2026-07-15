

export const Footer = () => {
const today = new Date();
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center  px-4 md:flex-row">
        <p className="text-sm ">© {today.getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;