package com.devsuperior.dspesquisa.repositories;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dspesquisa.entities.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long>{

	@Query("select rec from Record rec where" + "(:min is null or rec.moment >= :min) and " + "(:max is null or rec.moment <= :max)")
	Page<Record> findByMoments(Instant min, Instant max, Pageable pageable);

}
