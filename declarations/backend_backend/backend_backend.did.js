export const idlFactory = ({ IDL }) => {
  const Links = IDL.Record({ 'link' : IDL.Text, 'user' : IDL.Principal });
  return IDL.Service({
    'getLink' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Text)], ['query']),
    'insert' : IDL.Func([IDL.Nat, Links], [IDL.Opt(Links)], []),
  });
};
export const init = ({ IDL }) => { return []; };
