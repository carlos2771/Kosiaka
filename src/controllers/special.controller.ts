

export const special = (req:any, res: any) => {
  return res.json({ msg: `Hey ${req.body.email}!` });
};