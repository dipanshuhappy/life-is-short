import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Links { 'link' : string, 'user' : Principal }
export interface _SERVICE {
  'getLink' : ActorMethod<[bigint], [] | [string]>,
  'insert' : ActorMethod<[bigint, Links], [] | [Links]>,
}
