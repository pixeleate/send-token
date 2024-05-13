import Wallet from '@/components/Wallet';

const Header = () => {
  return (
    <header className='flex w-full items-center p-4'>
      <div className='flex-1 '>
        <h1 className='font-bold'>Send Token</h1>
        <p className='text-[11px] text-slate-300'>Web3 Application</p>
      </div>
      <Wallet />
    </header>
  );
};

export default Header;
