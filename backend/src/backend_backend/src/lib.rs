use candid::{
    Decode, Principal,CandidType
};
use candid::Deserialize;
use ic_cdk::{
   
    query, update,export_candid
};
use ic_stable_structures::memory_manager::{
    MemoryId,MemoryManager,VirtualMemory
};
use ic_stable_structures::{
    storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::{borrow::Cow,cell::RefCell};





const  MAX_USER_PRINCIPAL_SIZE: u32 = 30;

type Memory = VirtualMemory<DefaultMemoryImpl>;

#[derive(Debug,CandidType,Deserialize,Clone)]
pub struct Links {

    user:Principal,
    
    link: String,

}

impl Storable for Links{
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(
            candid::encode_one(&self).unwrap()
        )
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
    const BOUND: ic_stable_structures::storable::Bound = Bound::Unbounded;
}

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    
    static LINKS: RefCell<StableBTreeMap<u128,Links,Memory>> =
        RefCell::new(
            StableBTreeMap::init(
                MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
            )
        )
}


#[query]
fn getLink(key: u128) -> Option<String> {
    let link  = LINKS.with(
        |links| links.borrow().get(&key)
    );
    ic_cdk::println!("link: {:?}",link);
    match link {
        Some(link) => Some(link.link),
        None => None,
    }
}




#[update]
fn insert(key: u128, value: Links) -> Option<Links> {
    ic_cdk::println!("inserting link");
    ic_cdk::println!("key: {}",key);
    ic_cdk::println!("value: {}",value.link);

    LINKS.with(|p| p.borrow_mut().insert(key, value))
}

export_candid!();
