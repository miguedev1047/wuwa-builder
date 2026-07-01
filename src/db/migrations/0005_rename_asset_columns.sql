-- Rename misleading 'resonator_id' columns in asset tables
-- These columns actually store the ID of the sub-entity (skill/sequence/bonus), not the resonator

-- Skills assets: resonator_id → skill_id
ALTER TABLE resonator_skills_assets RENAME COLUMN resonator_id TO skill_id;

-- Sequences assets: resonator_id → sequence_id
ALTER TABLE resonator_sequences_assets RENAME COLUMN resonator_id TO sequence_id;

-- Bonus assets: resonator_id → bonus_id
ALTER TABLE resonator_bonus_assets RENAME COLUMN resonator_id TO bonus_id;
